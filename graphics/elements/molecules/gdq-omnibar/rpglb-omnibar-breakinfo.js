import * as tslib_1 from "tslib";
import { TweenLite, Sine } from 'gsap';
const { customElement } = Polymer.decorators;
const currentHost = nodecg.Replicant('currentHost');
const nowPlaying = nodecg.Replicant('nowPlaying');
let RPGLBOmnibarBreakinfoElement = class RPGLBOmnibarBreakinfoElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this._showing = false;
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            currentHost.on('change', newVal => {
                this.$.host.updateName({ alias: newVal });
            });
            nowPlaying.on('change', newVal => {
                this.$.music.updateName({ alias: `${newVal.game || '?'} - ${newVal.title || '?'}` });
            });
        });
    }
    enter() {
        if (this._showing) {
            return;
        }
        return TweenLite.fromTo(this, 0.466, {
            y: 84,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Sine.easeInOut,
            onComplete: () => {
                this._showing = true;
            }
        });
    }
    exit() {
        if (!this._showing) {
            return;
        }
        return TweenLite.fromTo(this, 0.466, {
            y: 0,
            opacity: 1,
        }, {
            y: 84,
            opacity: 0,
            ease: Sine.easeInOut,
            onStart: () => {
                this._showing = false;
            }
        });
    }
};
RPGLBOmnibarBreakinfoElement = tslib_1.__decorate([
    customElement('rpglb-omnibar-breakinfo')
], RPGLBOmnibarBreakinfoElement);
export default RPGLBOmnibarBreakinfoElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBnbGItb21uaWJhci1icmVha2luZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJycGdsYi1vbW5pYmFyLWJyZWFraW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUE7QUFLcEMsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFM0MsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYyxhQUFhLENBQUMsQ0FBQztBQUNqRSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFhLFlBQVksQ0FBQyxDQUFDO0FBRzlELElBQXFCLDRCQUE0QixHQUFqRCxNQUFxQiw0QkFBNkIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUR6RTs7UUFFUyxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBbUQxQixDQUFDO0lBakRBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUUxQixPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBNkIsQ0FBQyxVQUFVLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQztZQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQThCLENBQUMsVUFBVSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDOUcsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUDtRQUVELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3BDLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDVixFQUFFO1lBQ0YsQ0FBQyxFQUFFLENBQUM7WUFDSixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztZQUNwQixVQUFVLEVBQUUsR0FBRyxFQUFFO2dCQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDO1NBQ0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUk7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQixPQUFPO1NBQ1A7UUFFRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNwQyxDQUFDLEVBQUUsQ0FBQztZQUNKLE9BQU8sRUFBRSxDQUFDO1NBQ1YsRUFBRTtZQUNGLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1NBQ0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFwRG9CLDRCQUE0QjtJQURoRCxhQUFhLENBQUMseUJBQXlCLENBQUM7R0FDcEIsNEJBQTRCLENBb0RoRDtlQXBEb0IsNEJBQTRCIn0=