import * as tslib_1 from "tslib";
import { TimelineLite, Power3 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const SLIDE_HOLD_DURATION = 4;
const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
const total = nodecg.Replicant('total');
let GDQOmnibarMilestoneAlertElement = class GDQOmnibarMilestoneAlertElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.tl = new TimelineLite({ autoRemoveChildren: true });
    }
    ready() {
        super.ready();
        let lastRaw;
        total.on('change', newVal => {
            if (!newVal || typeof newVal.raw !== 'number') {
                return;
            }
            if (!this._initialized) {
                lastRaw = newVal.raw;
                this._initialized = true;
                return;
            }
            // If we have manually disabled this feature, return.
            if (!recordTrackerEnabled.value) {
                return;
            }
            const highestPassedMilestone = this.milestones
                .slice(0)
                .reverse()
                .find(milestone => {
                return newVal.raw >= milestone.total;
            });
            if (!highestPassedMilestone) {
                return;
            }
            if (lastRaw &&
                newVal.raw >= highestPassedMilestone.total &&
                lastRaw < highestPassedMilestone.total) {
                const alertAnim = this.alertMilestonePassed(highestPassedMilestone);
                this.tl.add(alertAnim, '+=0.1');
            }
            lastRaw = newVal.raw;
        });
    }
    startLimitBreakAnim() {
        const elems = [
            this.$.limitbreak_1,
            this.$.limitbreak_2,
            this.$.limitbreak_3,
            this.$.limitbreak_4,
            this.$.limitbreak_5,
            this.$.limitbreak_6,
            this.$.limitbreak_7,
            this.$.limitbreak_8,
            this.$.limitbreak_9,
            this.$.limitbreak_10,
            this.$.limitbreak_11,
        ];
        const colors = [
            '#f00',
            '#00f',
            '#666',
            '#fff',
            '#ff0',
            '#0ff',
            '#7d7',
            '#f0f',
        ];
        let colorOfL = 0;
        this.lbInterval = window.setInterval(() => {
            for (let i = 0; i < elems.length; i++) {
                const elem = elems[i];
                elem.style.color = colors[(colorOfL + i) % colors.length];
            }
            colorOfL += 1;
        }, 100);
    }
    alertMilestonePassed(milestone) {
        this.startLimitBreakAnim();
        const tl = new TimelineLite();
        tl.call(() => {
            this.displayingMilestone = milestone;
        }, undefined, null, '+=0.1');
        tl.to(this.$.layer1, 0.5, {
            clipPath: 'inset(0 0% 0 0%)',
            ease: Power3.easeInOut
        });
        tl.to(this.$.layer2, 0.5, {
            clipPath: 'inset(0 0% 0 0%)',
            ease: Power3.easeInOut
        }, `+=${SLIDE_HOLD_DURATION}`);
        tl.call(() => {
            clearInterval(this.lbInterval);
        }, undefined, `+=${SLIDE_HOLD_DURATION}`);
        tl.to(this.$.layer3, 0.5, {
            clipPath: 'inset(0 0% 0 0%)',
            ease: Power3.easeInOut
        }, `+=${SLIDE_HOLD_DURATION}`);
        tl.set([this.$.layer1, this.$.layer2], { opacity: 0 });
        tl.set(this.$.layer3, {
            // Prevent GSAP from using shorthand, which would break the next anim.
            clipPath: 'inset(0.01px 0.01% 0.02px 0%)'
        });
        tl.to(this.$.layer3, 0.5, {
            clipPath: 'inset(0px 0% 0px 100%)',
            ease: Power3.easeInOut
        }, `+=${SLIDE_HOLD_DURATION}`);
        tl.set([
            this.$.layer1,
            this.$.layer2,
            this.$.layer3
        ], {
            clearProps: 'all'
        });
        return tl;
    }
    _formatTotal(amount) {
        return '$' + amount.toLocaleString('en-US', {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        });
    }
    _calcLayer3Message(succeedingMilestone) {
        if (succeedingMilestone) {
            return `NEXT GOAL:&nbsp;<b>${succeedingMilestone.name} - ${this._formatTotal(succeedingMilestone.total)}</b>`;
        }
        return '<b>THANK YOU ALL FOR YOUR SUPPORT!</b>';
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQOmnibarMilestoneAlertElement.prototype, "milestones", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQOmnibarMilestoneAlertElement.prototype, "displayingMilestone", void 0);
GDQOmnibarMilestoneAlertElement = tslib_1.__decorate([
    customElement('gdq-omnibar-milestone-alert')
], GDQOmnibarMilestoneAlertElement);
export default GDQOmnibarMilestoneAlertElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbWlsZXN0b25lLWFsZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9tbmliYXItbWlsZXN0b25lLWFsZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUkxQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFDOUIsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUF1QixzQkFBc0IsQ0FBQyxDQUFDO0FBQzVGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVEsT0FBTyxDQUFDLENBQUM7QUFHL0MsSUFBcUIsK0JBQStCLEdBQXBELE1BQXFCLCtCQUFnQyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBRDVFOztRQVFDLE9BQUUsR0FBaUIsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBbUpqRSxDQUFDO0lBaEpBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxJQUFJLE9BQWUsQ0FBQztRQUNwQixLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQzlDLE9BQU87YUFDUDtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN2QixPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLE9BQU87YUFDUDtZQUVELHFEQUFxRDtZQUNyRCxJQUFJLENBQUMsb0JBQW9CLENBQUMs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