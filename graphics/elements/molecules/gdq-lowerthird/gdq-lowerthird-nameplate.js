import * as tslib_1 from "tslib";
var GDQLowerthirdNameplateElement_1;
import { Power2, TimelineLite, TweenLite } from 'gsap';
const ENTRANCE_ANIM_DURATION = 0.5;
const ENTRANCE_ANIM_EASE = Power2.easeInOut;
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQLowerthirdNameplateElement = GDQLowerthirdNameplateElement_1 = class GDQLowerthirdNameplateElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.header = false;
    }
    enter() {
        const tl = new TimelineLite();
        tl.call(() => {
            if (this.header) {
                this.$.nameplate.updateName({ alias: "#RPGLB2019", rotate: false });
            }
        }, 0);
        tl.to(this.$.name, ENTRANCE_ANIM_DURATION, {
            scaleX: 1,
            ease: ENTRANCE_ANIM_EASE
        }, 0);
        tl.to(this.$.title, 0.4, {
            y: '0%',
            ease: Power2.easeOut,
            onStart: () => {
                this.$.title.style.opacity = '1';
                this.$['title-text'].maxWidth = this.$.title.clientWidth - 60;
            }
        }, '-=0.1');
        return tl;
    }
    reset() {
        TweenLite.set(this.$.name, { scaleX: 0 });
        TweenLite.set(this.$.title, { y: '-100%', opacity: 0 });
    }
    _nameChanged(newVal) {
        return this.$.nameplate.updateName({ alias: newVal, rotate: false });
    }
    _computeHasTitle(title) {
        return Boolean(title && title.trim().length > 0);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQLowerthirdNameplateElement.prototype, "header", void 0);
tslib_1.__decorate([
    property({ type: String, observer: GDQLowerthirdNameplateElement_1.prototype._nameChanged })
], GDQLowerthirdNameplateElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQLowerthirdNameplateElement.prototype, "title", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeHasTitle(title)' })
], GDQLowerthirdNameplateElement.prototype, "hasTitle", void 0);
GDQLowerthirdNameplateElement = GDQLowerthirdNameplateElement_1 = tslib_1.__decorate([
    customElement('gdq-lowerthird-nameplate')
], GDQLowerthirdNameplateElement);
export default GDQLowerthirdNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWxvd2VydGhpcmQtbmFtZXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWxvd2VydGhpcmQtbmFtZXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3JELE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0FBQ25DLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUM1QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsNkJBQTZCLHFDQUFsRCxNQUFxQiw2QkFBOEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUwxRTs7O09BR0c7SUFDSDs7UUFHQyxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBaURoQixDQUFDO0lBdENBLEtBQUs7UUFDSixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBa0MsQ0FBQyxVQUFVLENBQUMsRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQzVGO1FBQ0YsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUMxQyxNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxrQkFBa0I7U0FDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ3hCLENBQUMsRUFBRSxJQUFJO1lBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO1lBQ3BCLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUF3QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3hFLENBQUM7U0FDRCxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRVosT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsS0FBSztRQUNKLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN4QyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDMUIsT0FBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQWtDLENBQUMsVUFBVSxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBYTtRQUM3QixPQUFPLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0QsQ0FBQTtBQWpEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7NkRBQ3JDO0FBR2Y7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSwrQkFBNkIsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFDLENBQUM7MkRBQzVFO0FBR2I7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NERBQ1g7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBQyxDQUFDOytEQUN2RTtBQVhFLDZCQUE2QjtJQURqRCxhQUFhLENBQUMsMEJBQTBCLENBQUM7R0FDckIsNkJBQTZCLENBbURqRDtlQW5Eb0IsNkJBQTZCIn0=