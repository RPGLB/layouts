import * as tslib_1 from "tslib";
import { Sine, TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarListItemElement = class GDQOmnibarListItemElement extends Polymer.Element {
    ready() {
        super.ready();
    }
    enter() {
        const enterTL = new TimelineLite();
        enterTL.fromTo(this, 0.234, {
            y: 55,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Sine.easeOut
        });
        return enterTL;
    }
    exit() {
        const exitTL = new TimelineLite();
        exitTL.to(this, 0.465, {
            y: 55,
            opacity: 0,
            ease: Sine.easeIn
        });
        return exitTL;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQOmnibarListItemElement.prototype, "firstLine", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQOmnibarListItemElement.prototype, "secondLine", void 0);
GDQOmnibarListItemElement = tslib_1.__decorate([
    customElement('gdq-omnibar-list-item')
], GDQOmnibarListItemElement);
export default GDQOmnibarListItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbGlzdC1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9tbmliYXItbGlzdC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd4QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBT3JFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNKLE1BQU0sT0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzNCLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDVixFQUFFO1lBQ0YsQ0FBQyxFQUFFLENBQUM7WUFDSixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztTQUNsQixDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSTtRQUNILE1BQU0sTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3RCLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDakIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0NBQ0QsQ0FBQTtBQW5DQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0REFDUDtBQUdsQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs2REFDTjtBQUxDLHlCQUF5QjtJQUQ3QyxhQUFhLENBQUMsdUJBQXVCLENBQUM7R0FDbEIseUJBQXlCLENBcUM3QztlQXJDb0IseUJBQXlCIn0=