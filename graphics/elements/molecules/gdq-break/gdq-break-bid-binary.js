import * as tslib_1 from "tslib";
import { TimelineLite, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidBinaryElement = class GDQBreakBidBinaryElement extends Polymer.Element {
    ready() {
        super.ready();
        const optionOneBar = this.$.optionOneBar;
        const optionTwoBar = this.$.optionTwoBar;
        const total = this.bid.rawTotal;
        const [optionOne, optionTwo] = this.bid.options;
        this.optionOneText = `${optionOne.name} - ${optionOne.total}`;
        this.optionTwoText = `${optionTwo.name} - ${optionTwo.total}`;
        const optionOneBarPercent = optionOne.rawTotal / total * 100;
        const optionTwoBarPercent = 100 - optionOneBarPercent;
        const tl = new TimelineLite();
        tl.addLabel('start', 0.3);
        tl.to(optionOneBar, 0.5, { width: `${optionOneBarPercent}%`, ease: Power2.easeOut }, 'start');
        tl.to(optionTwoBar, 0.5, { width: `${optionTwoBarPercent}%`, ease: Power2.easeOut }, 'start');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1iaW5hcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkLWJpbmFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFFekMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQVNwRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBRWIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUE4QixDQUFBO1FBQzFELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBOEIsQ0FBQTtRQUUxRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQTtRQUMvQixNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBO1FBRS9DLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxNQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksTUFBTSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7UUFFN0QsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDNUQsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLEdBQUcsbUJBQW1CLENBQUM7UUFFdEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtRQUM3QixFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN6QixFQUFFLENBQUMsRUFBRSxDQUNKLFlBQVksRUFDWixHQUFHLEVBQ0gsRUFBQyxLQUFLLEVBQUUsR0FBRyxtQkFBbUIsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFDLEVBQ3hELE9BQU8sQ0FDUCxDQUFBO1FBQ0QsRUFBRSxDQUFDLEVBQUUsQ0FDSixZQUFZLEVBQ1osR0FBRyxFQUNILEVBQUMsS0FBSyxFQUFFLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBQyxFQUN4RCxPQUFPLENBQ1AsQ0FBQTtJQUNGLENBQUM7Q0FDRCxDQUFBO0FBckNBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNWO0FBR2Y7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7K0RBQ0o7QUFFckI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7K0RBQ0o7QUFQRCx3QkFBd0I7SUFENUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0dBQ2pCLHdCQUF3QixDQXVDNUM7ZUF2Q29CLHdCQUF3QiJ9