'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as TimeUtils from './lib/time';
import * as GDQTypes from '../types';
import {Replicant} from '../types/nodecg';
import {InterviewThrowIncoming} from '../types/schemas/interview_throwIncoming';
import {InterviewStopwatch} from '../types/schemas/interview_stopwatch';
import {CurrentLayout} from '../types/schemas/currentLayout';
import {InterviewPrizePlaylist} from '../types/schemas/interview_prizePlaylist';
import {InterviewShowPrizesOnMonitor} from '../types/schemas/interview_showPrizesOnMonitor';

const nodecg = nodecgApiContext.get();

const lowerthirdPulseTimeRemaining = nodecg.Replicant<number>('interview:lowerthirdTimeRemaining', {defaultValue: 0, persistent: false});
const lowerthirdShowing = nodecg.Replicant<boolean>('interview:lowerthirdShowing', {defaultValue: false, persistent: false});
const throwIncoming = nodecg.Replicant<InterviewThrowIncoming>('interview_throwIncoming');
const interviewStopwatch = nodecg.Replicant<InterviewStopwatch>('interview_stopwatch');
const currentLayout = nodecg.Replicant<CurrentLayout>('currentLayout');
const prizePlaylist = nodecg.Replicant<InterviewPrizePlaylist>('interview_prizePlaylist');
const showPrizesOnMonitor = nodecg.Replicant<InterviewShowPrizesOnMonitor>('interview_showPrizesOnMonitor');
const allPrizes = nodecg.Replicant<GDQTypes.Prize[]>('allPrizes');
const pulseIntervalMap = new Map();
const pulseTimeoutMap = new Map();
let interviewTimer: TimeUtils.CountupTimer | null;

// Restore lost time, if applicable.
if (interviewStopwatch.value.running) {
	const missedTime = Date.now() - interviewStopwatch.value.time.timestamp;
	const previousTime = interviewStopwatch.value.time.raw;
	const offset = previousTime + missedTime;
	interviewStopwatch.value.running = false;
	startInterviewTimer(offset);
}

nodecg.Replicant('interview_names');

lowerthirdShowing.on('change', (newVal: boolean) => {
	if (!newVal) {
		clearTimerFromMap(lowerthirdShowing, pulseIntervalMap);
		clearTimerFromMap(lowerthirdShowing, pulseTimeoutMap);
		lowerthirdPulseTimeRemaining.value = 0;
	}
});

currentLayout.on('change', (newVal: string) => {
	if (newVal === 'interview') {
		throwIncoming.value = false;
		startInterviewTimer();
	} else {
		stopInterviewTimer();
	}
});

nodecg.listenFor('pulseInterviewLowerthird', (duration: number) => {
	pulse(lowerthirdShowing, lowerthirdPulseTimeRemaining, duration);
});

// Ensure that the prize playlist only contains prizes currently in the tracker.
allPrizes.on('change', (newVal: any) => {
	prizePlaylist.value = prizePlaylist.value.filter((playlistEntry: any) => {
		return newVal.find((prize: any) => {
			return prize.id === playlistEntry.id;
		});
	});
});

nodecg.listenFor('interview:addPrizeToPlaylist', (prizeId: unknown) => {
	if (typeof prizeId !== 'number' || prizeId < 0) {
		return;
	}

	const existingIndex = prizePlaylist.value.findIndex(({id}: {id: number}) => id === prizeId);
	if (existingIndex >= 0) {
		return;
	}

	prizePlaylist.value.push({
		id: prizeId,
		complete: false
	});
});

nodecg.listenFor('interview:markPrizeAsDone', (prizeId: unknown) => {
	if (typeof prizeId !== 'number' || prizeId < 0) {
		return;
	}

	const entry = prizePlaylist.value.find(({id}: {id: number}) => id === prizeId);
	if (entry) {
		entry.complete = true;
	}
});

nodecg.listenFor('interview:markPrizeAsNotDone', (prizeId: unknown) => {
	if (typeof prizeId !== 'number' || prizeId < 0) {
		return;
	}

	const entry = prizePlaylist.value.find(({id}: {id: number}) => id === prizeId);
	if (entry) {
		entry.complete = false;
	}
});

nodecg.listenFor('interview:clearPrizePlaylist', () => {
	prizePlaylist.value = [];
});

nodecg.listenFor('interview:showPrizePlaylistOnMonitor', () => {
	showPrizesOnMonitor.value = true;
});

nodecg.listenFor('interview:hidePrizePlaylistOnMonitor', () => {
	showPrizesOnMonitor.value = false;
});

/**
 * Pulses a replicant for a specified duration, and tracks the remaining time in another replicant.
 * @param showingRep - The Boolean replicant that controls if the element is showing or not.
 * @param pulseTimeRemainingRep - The Number replicant that tracks the remaining time in this pulse.
 * @param duration - The desired duration of the pulse in seconds.
 * @returns A promise which resolves when the pulse has completed.
 */
async function pulse(showingRep: Replicant<boolean>, pulseTimeRemainingRep: Replicant<number>, duration: number) {
	return new Promise(resolve => {
		// Don't stack pulses
		if (showingRep.value) {
			return resolve();
		}

		showingRep.value = true;
		pulseTimeRemainingRep.value = duration;
		clearTimerFromMap(showingRep, pulseIntervalMap);
		clearTimerFromMap(showingRep, pulseTimeoutMap);

		// Count down lowerthirdPulseTimeRemaining
		pulseIntervalMap.set(showingRep, setInterval(() => {
			if (pulseTimeRemainingRep.value > 0) {
				pulseTimeRemainingRep.value--;
			} else {
				clearTimerFromMap(showingRep, pulseIntervalMap);
				pulseTimeRemainingRep.value = 0;
			}
		}, 1000));

		// End pulse after "duration" seconds
		pulseTimeoutMap.set(showingRep, setTimeout(() => {
			clearTimerFromMap(showingRep, pulseIntervalMap);
			pulseTimeRemainingRep.value = 0;
			showingRep.value = false;
			resolve();
		}, duration * 1000));
	});
}

function clearTimerFromMap(key: any, map: Map<any, number>) {
	clearInterval(map.get(key));
	clearTimeout(map.get(key));
	map.delete(key);
}

function startInterviewTimer(offset = 0) {
	if (interviewStopwatch.value.running) {
		return;
	}

	interviewStopwatch.value.running = true;
	interviewStopwatch.value.time = TimeUtils.createTimeStruct();
	if (interviewTimer) {
		interviewTimer.stop();
		interviewTimer.removeAllListeners();
	}

	interviewTimer = new TimeUtils.CountupTimer({offset});
	interviewTimer.on('tick', elapsedTimeStruct => {
		interviewStopwatch.value.time = elapsedTimeStruct;
	});
}

function stopInterviewTimer() {
	if (!interviewStopwatch.value.running) {
		return;
	}

	interviewStopwatch.value.running = false;
	if (interviewTimer) {
		interviewTimer.stop();
	}
}
