import * as tslib_1 from "tslib";
import { TweenLite, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomCandystripeBarElement = class AtomCandystripeBarElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.progress = 0;
        this._tween = null;
    }
    _killTween() {
        if (this._tween) {
            this._tween.kill();
            this._tween = null;
        }
    }
    reset() {
        this._killTween();
        return TweenLite.set(this.$['progress-bar'], { width: '0%' });
    }
    fill(duration) {
        this._killTween();
        const progressWidth = (this.progress * 100) + '%';
        this._tween = TweenLite.to(this.$['progress-bar'], duration, {
            width: progressWidth,
            ease: Power2.easeOut
        });
        return this._tween;
    }
};
tslib_1.__decorate([
    property({ type: Number })
], AtomCandystripeBarElement.prototype, "progress", void 0);
AtomCandystripeBarElement = tslib_1.__decorate([
    customElement('atom-candystripe-bar')
], AtomCandystripeBarElement);
export default AtomCandystripeBarElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1jYW5keXN0cmlwZS1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLWNhbmR5c3RyaXBlLWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDdkMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLHlCQUF5QixHQUE5QyxNQUFxQix5QkFBMEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUx0RTs7O09BR0c7SUFDSDs7UUFHQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsV0FBTSxHQUFxQixJQUFJLENBQUM7SUEwQmpDLENBQUM7SUF4QkEsVUFBVTtRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ25CO0lBQ0YsQ0FBQztJQUVELEtBQUs7UUFDSixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBSSxDQUFDLFFBQWdCO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixNQUFNLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRWxELElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRTtZQUM1RCxLQUFLLEVBQUUsYUFBYTtZQUNwQixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87U0FDcEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3BCLENBQUM7Q0FDRCxDQUFBO0FBNUJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzJEQUNaO0FBRk8seUJBQXlCO0lBRDdDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztHQUNqQix5QkFBeUIsQ0E4QjdDO2VBOUJvQix5QkFBeUIifQ==