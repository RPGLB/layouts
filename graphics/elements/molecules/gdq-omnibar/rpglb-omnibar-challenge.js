import * as tslib_1 from "tslib";
import { TweenLite, TimelineLite, Sine, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const RIGHT_TIME_PER_PIXEL = 0.00107;
/**
 * @customElement
 * @polymer
 */
let RPGLBOmnibarChallengeElement = class RPGLBOmnibarChallengeElement extends Polymer.Element {
    ready() {
        super.ready();
        const amountElem = this.$.amount;
        amountElem.ease = Power2.easeOut;
        amountElem.displayValueTransform = displayValue => {
            if (displayValue >= this.bid.rawGoal) {
                amountElem.style.color = '#f9f9f9';
            }
            return '$' + displayValue.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
        };
    }
    enter() {
        const tl = new TimelineLite();
        const progressBar = this.$['progress-bar'];
        let progressPercentage = this.bid.rawTotal / this.bid.rawGoal;
        progressPercentage = Math.min(progressPercentage, 1); // Clamp to 1 max.
        progressPercentage = Math.max(progressPercentage, 0); // Clamp to 0 min.
        const progressElem = this.$.progress;
        const progressFillWidth = this.getBoundingClientRect().width * progressPercentage;
        this._progressTweenDuration = progressFillWidth * RIGHT_TIME_PER_PIXEL;
        progressBar.progress = progressPercentage;
        tl.add(progressBar.reset());
        tl.fromTo(this, 0.234, {
            y: 55,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Sine.easeOut
        });
        const totalElem = this.$.total;
        const totalTextCanFitOnLeft = (progressFillWidth - 7) >= (totalElem.clientWidth + 24);
        if (totalTextCanFitOnLeft) {
            totalElem.style.left = 'unset';
            totalElem.style.textAlign = 'right';
            TweenLite.set(totalElem, { right: 6 });
        }
        else {
            totalElem.style.right = 'unset';
            totalElem.style.textAlign = 'left';
            TweenLite.set(totalElem, { left: progressFillWidth + 6 });
        }
        tl.addLabel('fillProgress', '+=0');
        tl.to(progressElem, this._progressTweenDuration, {
            width: progressFillWidth,
            ease: Power2.easeOut
        }, 'fillProgress');
        tl.add(progressBar.fill(this._progressTweenDuration), 'fillProgress');
        tl.add(this.$.amount.tween(this.bid.rawTotal, this._progressTweenDuration), 'fillProgress');
        tl.to(totalElem, 0.123, {
            opacity: 1,
            ease: Sine.easeIn
        }, 'fillProgress');
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.to(this, 0.465, {
            y: 55,
            opacity: 0,
            ease: Sine.easeIn
        });
        return tl;
    }
    render() {
    }
};
tslib_1.__decorate([
    property({ type: Object })
], RPGLBOmnibarChallengeElement.prototype, "bid", void 0);
RPGLBOmnibarChallengeElement = tslib_1.__decorate([
    customElement('rpglb-omnibar-challenge')
], RPGLBOmnibarChallengeElement);
export default RPGLBOmnibarChallengeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBnbGItb21uaWJhci1jaGFsbGVuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJycGdsYi1vbW5pYmFyLWNoYWxsZW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUkzRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUM7QUFFckM7OztHQUdHO0FBRUgsSUFBcUIsNEJBQTRCLEdBQWpELE1BQXFCLDRCQUE2QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTXhFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQW1DLENBQUM7UUFFOUQsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxZQUFZLENBQUMsRUFBRTtZQUNqRCxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2FBQ25DO1lBRUQsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pELHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLFdBQVcsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBOEIsQ0FBQztRQUV4RSxJ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