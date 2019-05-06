import * as tslib_1 from "tslib";
import { TimelineLite, Power3 } from 'gsap';
const { customElement, property } = Polymer.decorators;
let GDQNameplateResultElement = class GDQNameplateResultElement extends Polymer.Element {
    _showingChanged(showing) {
        if (showing) {
            const tl = new TimelineLite();
            tl.to(this, 0.5, {
                transform: this.side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
                ease: Power3.easeInOut
            });
            if (!this.forfeit) {
                tl.to(this.$.placeWrapper, 0.5, {
                    transform: this.side === 'left' ? 'translateX(-20px)' : 'translateX(20px)',
                    ease: Power3.easeInOut
                });
            }
        }
        else {
            const tl = new TimelineLite();
            tl.to(this, 0.5, {
                transform: 'translateX(0)',
                ease: Power3.easeInOut
            });
            tl.to(this.$.placeWrapper, 0.5, {
                transform: 'translateX(0)',
                ease: Power3.easeInOut
            });
        }
    }
};
tslib_1.__decorate([
    property({ type: Boolean, observer: '_showingChanged' })
], GDQNameplateResultElement.prototype, "showing", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "side", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQNameplateResultElement.prototype, "place", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQNameplateResultElement.prototype, "time", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "firstPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "lastPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "forfeit", void 0);
GDQNameplateResultElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate-result')
], GDQNameplateResultElement);
export default GDQNameplateResultElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtcmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUU1QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBc0JyRSxlQUFlLENBQUMsT0FBZ0I7UUFDL0IsSUFBSSxPQUFPLEVBQUU7WUFDWixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO1lBQzdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDaEIsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO2dCQUMxRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO29CQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxrQkFBa0I7b0JBQzFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztpQkFDdEIsQ0FBQyxDQUFBO2FBQ0Y7U0FDRDthQUFNO1lBQ04sTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQTtZQUM3QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7YUFDdEIsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7Z0JBQy9CLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7YUFDdEIsQ0FBQyxDQUFBO1NBQ0Y7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQTdDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDLENBQUM7MERBQ3RDO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzt1REFDdEM7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDWDtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNaO0FBR2I7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDOzZEQUNoQztBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7NERBQ2pDO0FBR25CO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzswREFDbkM7QUFwQkcseUJBQXlCO0lBRDdDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQztHQUN4Qix5QkFBeUIsQ0ErQzdDO2VBL0NvQix5QkFBeUIifQ==