import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const nowPlaying = nodecg.Replicant('nowPlaying');
const countdownTimer = nodecg.Replicant('countdown');
let RPGLBOmnibarBreakinfoElement = class RPGLBOmnibarBreakinfoElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.music = '';
        this.timer = '';
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            nowPlaying.on('change', newVal => {
                this.music = `${newVal.game || '?'} - ${newVal.title || '?'}`;
            });
            countdownTimer.on('change', ({ minutes, seconds }) => {
                this.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            });
        });
    }
};
RPGLBOmnibarBreakinfoElement = tslib_1.__decorate([
    customElement('gdq-countdown')
], RPGLBOmnibarBreakinfoElement);
export default RPGLBOmnibarBreakinfoElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFDOUQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUdoRSxJQUFxQiw0QkFBNEIsR0FBakQsTUFBcUIsNEJBQTZCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEekU7O1FBRUMsVUFBSyxHQUFHLEVBQUUsQ0FBQTtRQUNWLFVBQUssR0FBRyxFQUFFLENBQUE7SUFjWCxDQUFDO0lBWkEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFLLElBQUksR0FBRyxFQUFFLENBQUE7WUFDOUQsQ0FBQyxDQUFDLENBQUM7WUFDSCxjQUFjLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxFQUFFLEVBQUU7Z0JBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFBO1lBQ3ZGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQWhCb0IsNEJBQTRCO0lBRGhELGFBQWEsQ0FBQyxlQUFlLENBQUM7R0FDViw0QkFBNEIsQ0FnQmhEO2VBaEJvQiw0QkFBNEIifQ==