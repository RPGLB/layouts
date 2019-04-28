import * as tslib_1 from "tslib";
var GDQBreakScheduleRunElement_1;
import { TweenLite, TimelineMax, Sine } from 'gsap';
import moment from 'moment';
const { customElement, property } = Polymer.decorators;
const DISPALY_DURATION = nodecg.bundleConfig.displayDuration;
/**
 * @customElement
 * @polymer
 */
let GDQBreakScheduleRunElement = GDQBreakScheduleRunElement_1 = class GDQBreakScheduleRunElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.upNext = false;
        this._currentRunnerIndex = 0;
    }
    ready() {
        super.ready();
        this.hidden = true;
    }
    _runChanged(newVal) {
        this.hidden = !newVal;
        if (!newVal) {
            return;
        }
        const infoRunnerElem = this.$['info-runner'];
        this._killRunnerLoopTimeline();
        infoRunnerElem.maxWidth = 0;
        infoRunnerElem.text = this._getLongestName(newVal.runners);
        TweenLite.set(infoRunnerElem, { opacity: 1, width: 'auto' });
        TweenLite.set(infoRunnerElem.$.fittedContent, { scaleX: 1 });
        const upcomingRun = moment(this.run.startTime);
        this.$.when.innerHTML = '| ' + upcomingRun.format('hh:mm A') + ' MDT';
        Polymer.RenderStatus.beforeNextRender(this, () => {
            infoRunnerElem.maxWidth =
                this.$.info.clientWidth -
                    this.$['info-category'].clientWidth;
            infoRunnerElem.style.width = `${this.$['info-runner'].clientWidth}px`;
            infoRunnerElem.text = newVal.runners[0].name;
            if (newVal.runners.length > 1) {
                this._killRunnerLoopTimeline();
                this._runnerTimeline = this._createRunnerLoopTimeline(newVal.runners);
            }
        });
    }
    _createRunnerLoopTimeline(runners) {
        const tl = new TimelineMax({ repeat: -1 });
        runners.slice(1).concat([runners[0]]).forEach(runner => {
            tl.to(this.$['info-runner'], 0.5, {
                opacity: 0,
                ease: Sine.easeInOut
            }, `+=${DISPALY_DURATION}`);
            tl.call(() => {
                this.$['info-runner'].text = runner.name;
            });
            tl.to(this.$['info-runner'], 0.5, {
                opacity: 1,
                ease: Sine.easeInOut
            }, '+=0.1');
        });
        return tl;
    }
    _killRunnerLoopTimeline() {
        if (this._runnerTimeline) {
            this._runnerTimeline.kill();
            this._runnerTimeline = null;
        }
    }
    _formatRunName(runName) {
        if (!runName || typeof runName !== 'string') {
            return '?';
        }
        return runName.replace(/\\n/g, ' ');
    }
    _getLongestName(runners) {
        return runners.reduce((accumulator, currentValue) => {
            if (!currentValue || !currentValue.name) {
                return accumulator;
            }
            return currentValue.name.length > accumulator.length ? currentValue.name : accumulator;
        }, '');
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: GDQBreakScheduleRunElement_1.prototype._runChanged })
], GDQBreakScheduleRunElement.prototype, "run", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQBreakScheduleRunElement.prototype, "upNext", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQBreakScheduleRunElement.prototype, "_currentRunnerIndex", void 0);
GDQBreakScheduleRunElement = GDQBreakScheduleRunElement_1 = tslib_1.__decorate([
    customElement('gdq-break-schedule-run')
], GDQBreakScheduleRunElement);
export default GDQBreakScheduleRunElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXNjaGVkdWxlLXJ1bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1zY2hlZHVsZS1ydW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBRTdEOzs7R0FHRztBQUVILElBQXFCLDBCQUEwQixrQ0FBL0MsTUFBcUIsMEJBQTJCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTDVGOzs7T0FHRztJQUNIOztRQU1DLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFHZix3QkFBbUIsR0FBRyxDQUFDLENBQUM7SUF1RnpCLENBQUM7SUFuRkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBVztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPO1NBQ1A7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBb0IsQ0FBQztRQUVoRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUU5QixjQUFzQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDcEMsY0FBc0IsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7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