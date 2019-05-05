import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Power2, Power4 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidBinaryElement = class GDQBreakBidBinaryElement extends Polymer.Element {
    ready() {
        super.ready();
        TweenLite.set(this, { opacity: 0 });
    }
    enter() {
        const optionOneBar = this.$.optionOneBar;
        const optionTwoBar = this.$.optionTwoBar;
        const total = this.bid.rawTotal;
        const [optionOne, optionTwo] = this.bid.options;
        this.optionOneText = `${optionOne.name} - ${optionOne.total}`;
        this.optionTwoText = `${optionTwo.name} - ${optionTwo.total}`;
        const optionOneBarPercent = optionOne.rawTotal / total * 100;
        const optionTwoBarPercent = 100 - optionOneBarPercent;
        const tl = new TimelineLite();
        tl.to(this, 0.465, {
            opacity: 1,
            ease: Power4.easeIn
        });
        tl.addLabel('start', 0.3);
        tl.to(optionOneBar, 0.5, { width: `${optionOneBarPercent}%`, ease: Power2.easeOut }, 'start');
        tl.to(optionTwoBar, 0.5, { width: `${optionTwoBarPercent}%`, ease: Power2.easeOut }, 'start');
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
], GDQBreakBidBinaryElement.prototype, "bid", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQBreakBidBinaryElement.prototype, "optionOneText", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQBreakBidBinaryElement.prototype, "optionTwoText", void 0);
GDQBreakBidBinaryElement = tslib_1.__decorate([
    customElement('gdq-break-bid-binary')
], GDQBreakBidBinaryElement);
export default GDQBreakBidBinaryElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1iaW5hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkLWJpbmFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQTtBQUU1RCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBU3BFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUE4QixDQUFDO1FBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBOEIsQ0FBQztRQUUzRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUNoQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBRWhELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxNQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksTUFBTSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFOUQsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDNUQsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLEdBQUcsbUJBQW1CLENBQUM7UUFFdEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLEVBQUUsQ0FDSixZQUFZLEVBQ1osR0FBRyxFQUNILEVBQUMsS0FBSyxFQUFFLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUN4RCxPQUFPLENBQ1AsQ0FBQztRQUNGLEVBQUUsQ0FBQyxFQUFFLENBQ0osWUFBWSxFQUNaLEdBQUcsRUFDSCxFQUFDLEtBQUssRUFBRSxHQUFHLG1CQUFtQixHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUMsRUFDeEQsT0FBTyxDQUNQLENBQUM7UUFFRixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0QsQ0FBQTtBQTNEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxREFDVjtBQUdmO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytEQUNIO0FBRXRCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytEQUNIO0FBUEYsd0JBQXdCO0lBRDVDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztHQUNqQix3QkFBd0IsQ0E2RDVDO2VBN0RvQix3QkFBd0IifQ==