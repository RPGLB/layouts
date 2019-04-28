import * as tslib_1 from "tslib";
import { TimelineLite, Power4 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidManyElement = class GDQBreakBidManyElement extends Polymer.Element {
    enter() {
        this.$.optionRepeat.render();
        const tl = new TimelineLite();
        const optionElements = Array.from(this.shadowRoot.querySelectorAll('gdq-break-bid-many-option'));
        tl.addLabel('showOptions', '+=0');
        optionElements.forEach((optionElement, index) => {
            optionElement.style.opacity = '0';
            tl.to(optionElement, 0.465, {
                opacity: 1,
                ease: Power4.easeIn
            }, `showOptions+=${index * 0.1}`);
        });
        tl.addLabel('enterOptions', '+=0');
        optionElements.forEach((optionElement, index) => {
            tl.add(optionElement.enter(), `enterOptions+=${index * 0.1}`);
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        const optionElements = Array.from(this.shadowRoot.querySelectorAll('gdq-break-bid-many-option'));
        tl.addLabel('hideOptions', '+=0');
        optionElements.slice(0).reverse().forEach((optionElement, index) => {
            tl.to(optionElement, 0.2, {
                opacity: 0,
                ease: Power4.easeIn
            }, `hideOptions+=${index * 0.1}`);
        });
        return tl;
    }
    _calcOptions(bid) {
        if (!bid) {
            return [];
        }
        return bid.options.slice(0, 3);
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidManyElement.prototype, "bid", void 0);
GDQBreakBidManyElement = tslib_1.__decorate([
    customElement('gdq-break-bid-many')
], GDQBreakBidManyElement);
export default GDQBreakBidManyElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1tYW55LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLWJpZC1tYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUsxQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsc0JBQXNCLEdBQTNDLE1BQXFCLHNCQUF1QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBSWxFLEtBQUs7UUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQWtDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFcEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsQ0FBbUMsQ0FBQztRQUVwSSxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQy9DLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNsQyxFQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTTthQUNuQixFQUFFLGdCQUFnQixLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0MsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsaUJBQWlCLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSTtRQUNILE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLENBQW1DLENBQUM7UUFFcEksRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07YUFDbkIsRUFBRSxnQkFBZ0IsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBYztRQUMxQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRCxDQUFBO0FBaERBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNWO0FBRkssc0JBQXNCO0lBRDFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLHNCQUFzQixDQWtEMUM7ZUFsRG9CLHNCQUFzQiJ9