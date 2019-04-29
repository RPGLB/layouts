import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Power2, Power4 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidChallengeElement = class GDQBreakBidChallengeElement extends Polymer.Element {
    ready() {
        super.ready();
        const amountElem = this.$.amount;
        amountElem.ease = Power2.easeOut;
        amountElem.displayValueTransform = displayValue => {
            if (displayValue >= this.bid.rawGoal) {
                amountElem.style.color = '#004ba0';
            }
            return '$' + displayValue.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
        };
        TweenLite.set(this, { opacity: 0 });
    }
    enter() {
        let meterPercent = this.bid.rawTotal / this.bid.rawGoal;
        meterPercent = Math.max(meterPercent, 0); // Clamp to min 0
        meterPercent = Math.min(meterPercent, 1); // Clamp to max 1
        if (Number.isNaN(meterPercent)) {
            meterPercent = 0;
        }
        const tl = new TimelineLite();
        const meterDuration = meterPercent * 0.75;
        const progressElem = this.$['visual-progress'];
        progressElem.progress = meterPercent;
        tl.add(progressElem.reset());
        tl.call(() => {
            this.$.goal.textContent = '/ $' + this.bid.rawGoal.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
        }, undefined, null, '+=0.03');
        tl.to(this, 0.465, {
            opacity: 1,
            ease: Power4.easeIn
        });
        tl.addLabel('tween', '+=0');
        tl.add(progressElem.fill(meterDuration), 'tween');
        tl.add(this.$.amount.tween(this.bid.rawTotal, meterDuration), 'tween');
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.to(this, 0.2, {
            opacity: 0,
            ease: Power4.easeIn
        });
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidChallengeElement.prototype, "bid", void 0);
GDQBreakBidChallengeElement = tslib_1.__decorate([
    customElement('gdq-break-bid-challenge')
], GDQBreakBidChallengeElement);
export default GDQBreakBidChallengeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1jaGFsbGVuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkLWNoYWxsZW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQU03RCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsMkJBQTJCLEdBQWhELE1BQXFCLDJCQUE0QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBSXZFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQW1DLENBQUM7UUFFOUQsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pDLFVBQVUsQ0FBQyxxQkFBcUIsR0FBRyxZQUFZLENBQUMsRUFBRTtZQUNqRCxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2FBQ25DO1lBRUQsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pELHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLFdBQVcsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUs7UUFDSixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUN4RCxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7UUFDM0QsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1FBQzNELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQixZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLGFBQWEsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTFDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQThCLENBQUM7UUFDNUUsWUFBWSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7UUFFckMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU3QixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtnQkFDMUUscUJBQXFCLEVBQUUsQ0FBQztnQkFDeEIsV0FBVyxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFOUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBb0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdEcsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSTtRQUNILE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNELENBQUE7QUFsRUE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0RBQ1Y7QUFGSywyQkFBMkI7SUFEL0MsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0dBQ3BCLDJCQUEyQixDQW9FL0M7ZUFwRW9CLDJCQUEyQiJ9