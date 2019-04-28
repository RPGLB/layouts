import * as tslib_1 from "tslib";
import { TimelineLite, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidManyOptionElement = class GDQBreakBidManyOptionElement extends Polymer.Element {
    ready() {
        super.ready();
        const amountElem = this.$.amount;
        amountElem.ease = Power2.easeOut;
        amountElem.displayValueTransform = displayValue => {
            return '$' + displayValue.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
        };
    }
    enter() {
        let meterPercent = this.option.rawTotal / this.bid.options[0].rawTotal;
        meterPercent = Math.max(meterPercent, 0); // Clamp to min 0
        meterPercent = Math.min(meterPercent, 1); // Clamp to max 1
        if (Number.isNaN(meterPercent)) {
            meterPercent = 0;
        }
        const tl = new TimelineLite();
        const duration = meterPercent * 0.75;
        const compareElem = this.$.compare;
        compareElem.progress = meterPercent;
        tl.add(compareElem.reset());
        tl.addLabel('tween', '+=0');
        tl.add(compareElem.fill(duration), 'tween');
        tl.add(this.$.amount.tween(this.option.rawTotal, duration), 'tween');
        return tl;
    }
    _calcOptionName(option) {
        if (!option) {
            return '';
        }
        return option.description || option.name;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidManyOptionElement.prototype, "bid", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidManyOptionElement.prototype, "option", void 0);
GDQBreakBidManyOptionElement = tslib_1.__decorate([
    customElement('gdq-break-bid-many-option')
], GDQBreakBidManyOptionElement);
export default GDQBreakBidManyOptionElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1tYW55LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1iaWQtbWFueS1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBSTFDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7O0dBR0c7QUFFSCxJQUFxQiw0QkFBNEIsR0FBakQsTUFBcUIsNEJBQTZCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFPeEUsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBbUMsQ0FBQztRQUM5RCxVQUFVLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakMsVUFBVSxDQUFDLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxFQUFFO1lBQ2pELE9BQU8sR0FBRyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO2dCQUNqRCxxQkFBcUIsRUFBRSxDQUFDO2dCQUN4QixXQUFXLEVBQUUsS0FBSzthQUNsQixDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNKLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUN2RSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7UUFDM0QsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1FBQzNELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQixZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLFFBQVEsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXJDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBb0MsQ0FBQztRQUNoRSxXQUFXLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUVwQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTVCLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxFQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBb0MsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEcsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsZUFBZSxDQUFDLE1BQWdCO1FBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPLEVBQUUsQ0FBQztTQUNWO1FBRUQsT0FBTyxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUMsQ0FBQztDQUNELENBQUE7QUEvQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7eURBQ1Y7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0REFDUjtBQUxHLDRCQUE0QjtJQURoRCxhQUFhLENBQUMsMkJBQTJCLENBQUM7R0FDdEIsNEJBQTRCLENBaURoRDtlQWpEb0IsNEJBQTRCIn0=