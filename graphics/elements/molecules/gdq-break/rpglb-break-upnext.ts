import {TimelineLite, Sine} from 'gsap';
import {Run, ScheduleItem} from '../../../../src/types/index';
import GDQBreakScheduleRunElement from './gdq-break-schedule-run';

const {customElement, property} = Polymer.decorators;

const currentRun = nodecg.Replicant<Run>('currentRun');
const schedule = nodecg.Replicant<ScheduleItem[]>('schedule');

/**
 * @customElement
 * @polymer
 */
@customElement('rpglb-break-upnext')
export default class RPGLBBreakUpnextElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	upNext: Run;

	_runElem: GDQBreakScheduleRunElement;
	_updateDebouncer: Polymer.Debouncer;

	ready() {
		super.ready();

		currentRun.on('change', () => {
			this.update();
		});

		schedule.on('change', () => {
			this.update();
		});

		this._runElem = this.$.upnext as GDQBreakScheduleRunElement;
	}

	update() {
		this._updateDebouncer = Polymer.Debouncer.debounce(
			this._updateDebouncer,
			Polymer.Async.timeOut.after(16),
			this._update.bind(this)
		);
	}

	_update() {
		const tl = new TimelineLite();

		if (schedule.status !== 'declared' ||
			currentRun.status !== 'declared' ||
			!schedule.value ||
			!currentRun.value) {
			return tl;
		}

		tl.set(this._runElem, {willChange: 'opacity'});

		tl.to(this._runElem, 0.5, {
			opacity: 0,
			ease: Sine.easeInOut
		}, '+=0.25');

		tl.call(() => {
			this.upNext = currentRun.value!;
		});

		tl.to(this._runElem, 0.5, {
			opacity: 1,
			ease: Sine.easeInOut
		}, '+=0.1');

		tl.set(this._runElem, {clearProps: 'will-change'});

		return tl;
	}
}
