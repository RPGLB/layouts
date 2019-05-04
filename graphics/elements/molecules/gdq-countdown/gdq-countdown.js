import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const nowPlaying = nodecg.Replicant('nowPlaying');
let RPGLBOmnibarBreakinfoElement = class RPGLBOmnibarBreakinfoElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.music = '';
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            nowPlaying.on('change', newVal => {
                this.music = `${newVal.game || '?'} - ${newVal.title || '?'}`;
            });
        });
    }
};
RPGLBOmnibarBreakinfoElement = tslib_1.__decorate([
    customElement('gdq-countdown')
], RPGLBOmnibarBreakinfoElement);
export default RPGLBOmnibarBreakinfoElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFHOUQsSUFBcUIsNEJBQTRCLEdBQWpELE1BQXFCLDRCQUE2QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBRHpFOztRQUVDLFVBQUssR0FBRyxFQUFFLENBQUE7SUFXWCxDQUFDO0lBVEEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxLQUFLLElBQUksR0FBRyxFQUFFLENBQUE7WUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBWm9CLDRCQUE0QjtJQURoRCxhQUFhLENBQUMsZUFBZSxDQUFDO0dBQ1YsNEJBQTRCLENBWWhEO2VBWm9CLDRCQUE0QiJ9