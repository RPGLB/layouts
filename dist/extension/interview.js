'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const TimeUtils = require("./lib/time");
const nodecg = nodecgApiContext.get();
const lowerthirdPulseTimeRemaining = nodecg.Replicant('interview:lowerthirdTimeRemaining', { defaultValue: 0, persistent: false });
const lowerthirdShowing = nodecg.Replicant('interview:lowerthirdShowing', { defaultValue: false, persistent: false });
const throwIncoming = nodecg.Replicant('interview_throwIncoming');
const interviewStopwatch = nodecg.Replicant('interview_stopwatch');
const currentLayout = nodecg.Replicant('currentLayout');
const prizePlaylist = nodecg.Replicant('interview_prizePlaylist');
const showPrizesOnMonitor = nodecg.Replicant('interview_showPrizesOnMonitor');
const allPrizes = nodecg.Replicant('allPrizes');
const pulseIntervalMap = new Map();
const pulseTimeoutMap = new Map();
let interviewTimer;
// Restore lost time, if applicable.
if (interviewStopwatch.value.running) {
    const missedTime = Date.now() - interviewStopwatch.value.time.timestamp;
    const previousTime = interviewStopwatch.value.time.raw;
    const offset = previousTime + missedTime;
    interviewStopwatch.value.running = false;
    startInterviewTimer(offset);
}
nodecg.Replicant('interview_names');
lowerthirdShowing.on('change', (newVal) => {
    if (!newVal) {
        clearTimerFromMap(lowerthirdShowing, pulseIntervalMap);
        clearTimerFromMap(lowerthirdShowing, pulseTimeoutMap);
        lowerthirdPulseTimeRemaining.value = 0;
    }
});
currentLayout.on('change', (newVal) => {
    if (newVal === 'interview') {
        throwIncoming.value = false;
        startInterviewTimer();
    }
    else {
        stopInterviewTimer();
    }
});
nodecg.listenFor('pulseInterviewLowerthird', (duration) => {
    pulse(lowerthirdShowing, lowerthirdPulseTimeRemaining, duration);
});
// Ensure that the prize playlist only contains prizes currently in the tracker.
allPrizes.on('change', (newVal) => {
    prizePlaylist.value = prizePlaylist.value.filter((playlistEntry) => {
        return newVal.find((prize) => {
            return prize.id === playlistEntry.id;
        });
    });
});
nodecg.listenFor('interview:addPrizeToPlaylist', (prizeId) => {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    const existingIndex = prizePlaylist.value.findIndex(({ id }) => id === prizeId);
    if (existingIndex >= 0) {
        return;
    }
    prizePlaylist.value.push({
        id: prizeId,
        complete: false
    });
});
nodecg.listenFor('interview:markPrizeAsDone', (prizeId) => {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    const entry = prizePlaylist.value.find(({ id }) => id === prizeId);
    if (entry) {
        entry.complete = true;
    }
});
nodecg.listenFor('interview:markPrizeAsNotDone', (prizeId) => {
    if (typeof prizeId !== 'number' || prizeId < 0) {
        return;
    }
    const entry = prizePlaylist.value.find(({ id }) => id === prizeId);
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
async function pulse(showingRep, pulseTimeRemainingRep, duration) {
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
            }
            else {
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
function clearTimerFromMap(key, map) {
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
    interviewTimer = new TimeUtils.CountupTimer({ offset });
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
//# sourceMappingURL=interview.js.map