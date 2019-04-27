import * as tslib_1 from "tslib";
import { TimelineLite, Power3, Power2 } from 'gsap';
const { customElement } = Polymer.decorators;
const ANCHOR_TWEEN_DURATION = 0.3;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarContentLabelElement = class GDQOmnibarContentLabelElement extends Polymer.Element {
    enter(labelHtml) {
        labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment
        const tl = new TimelineLite();
        tl.fromTo(this.$.body, ANCHOR_TWEEN_DURATION, {
            y: 55
        }, {
            y: 0,
            ease: Power2.easeOut,
            onStart: () => {
                const textElem = this.$.text;
                textElem.innerHTML = labelHtml;
            }
        });
        return tl;
    }
    change(labelHtml) {
        labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment
        const tl = new TimelineLite();
        tl.to(this.$.body, ANCHOR_TWEEN_DURATION, {
            y: 55,
            ease: Power2.easeIn,
            onComplete: () => {
                const textElem = this.$.text;
                textElem.innerHTML = labelHtml;
            }
        });
        tl.to(this.$.body, ANCHOR_TWEEN_DURATION, {
            y: 0,
            ease: Power2.easeOut,
            delay: 0.2
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.to(this, ANCHOR_TWEEN_DURATION, {
            y: 55,
            ease: Power3.easeInOut
        });
        return tl;
    }
    processLabelHtml(labelHtml) {
        return labelHtml.replace(/\\n/g, '<br/>');
    }
};
GDQOmnibarContentLabelElement = tslib_1.__decorate([
    customElement('gdq-omnibar-content-label')
], GDQOmnibarContentLabelElement);
export default GDQOmnibarContentLabelElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItY29udGVudC1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWNvbnRlbnQtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUMzQyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsQ0FBQztBQUVsQzs7O0dBR0c7QUFFSCxJQUFxQiw2QkFBNkIsR0FBbEQsTUFBcUIsNkJBQThCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFDekUsS0FBSyxDQUFDLFNBQWlCO1FBQ3RCLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxnREFBZ0Q7UUFFOUYsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQzdDLENBQUMsRUFBRSxFQUFFO1NBQ0wsRUFBRTtZQUNGLENBQUMsRUFBRSxDQUFDO1lBQ0osSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFzQixDQUFDO2dCQUMvQyxRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNoQyxDQUFDO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQWlCO1FBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxnREFBZ0Q7UUFFOUYsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ3pDLENBQUMsRUFBRSxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ25CLFVBQVUsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBc0IsQ0FBQztnQkFDL0MsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDaEMsQ0FBQztTQUNELENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDekMsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsS0FBSyxFQUFFLEdBQUc7U0FDVixDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUNsQyxDQUFDLEVBQUUsRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztTQUN0QixDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUNqQyxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRCxDQUFBO0FBekRvQiw2QkFBNkI7SUFEakQsYUFBYSxDQUFDLDJCQUEyQixDQUFDO0dBQ3RCLDZCQUE2QixDQXlEakQ7ZUF6RG9CLDZCQUE2QiJ9