import * as tslib_1 from "tslib";
import { TimelineLite, Sine } from 'gsap';
const { customElement } = Polymer.decorators;
const FLAG_ENTRANCE_DURATION = 0.334;
let GDQOmnibarLabelElement = class GDQOmnibarLabelElement extends Polymer.Element {
    ready() {
        super.ready();
        this.show = this.show.bind(this);
        this.change = this.change.bind(this);
        this.hide = this.hide.bind(this);
    }
    /**
     * Creates an animation timeline for showing the label.
     * @param text - The text to show.
     * @param options - Options for this animation.
     * @returns An animation timeline.
     */
    show(text) {
        const showTL = new TimelineLite();
        showTL.set(this.$['flag-text'], { textContent: text });
        showTL.fromTo(this.$.flag, FLAG_ENTRANCE_DURATION, {
            y: 84,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Sine.easeInOut
        });
        showTL.call(() => {
            this._showing = true;
        });
        return showTL;
    }
    /**
     * Creates an animation timeline for changing the label.
     * This should only be called after `.show()`.
     * @param text - The text to show.
     * @param options - Options for this animation.
     * @returns An animation timeline.
     */
    change(text) {
        const changeTL = new TimelineLite();
        changeTL.to(this.$.flag, FLAG_ENTRANCE_DURATION, {
            y: 84,
            ease: Sine.easeInOut
        });
        changeTL.set(this.$['flag-text'], { textContent: text });
        changeTL.to(this.$.flag, FLAG_ENTRANCE_DURATION, {
            y: 0,
            ease: Sine.easeInOut
        });
        return changeTL;
    }
    /**
     * Creates an animation timeline for hiding the label.
     * @returns  An animation timeline.
     */
    hide() {
        const hideTL = new TimelineLite();
        hideTL.to(this.$.flag, FLAG_ENTRANCE_DURATION, {
            y: 84,
            opacity: 0,
            ease: Sine.easeInOut
        });
        hideTL.call(() => {
            this._showing = false;
        });
        return hideTL;
    }
};
GDQOmnibarLabelElement = tslib_1.__decorate([
    customElement('gdq-omnibar-label')
], GDQOmnibarLabelElement);
export default GDQOmnibarLabelElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFeEMsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFM0MsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7QUFHckMsSUFBcUIsc0JBQXNCLEdBQTNDLE1BQXFCLHNCQUF1QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBR2xFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLENBQUMsSUFBWTtRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRXJELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDbEQsQ0FBQyxFQUFFLEVBQUU7WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNWLEVBQUU7WUFDRixDQUFDLEVBQUUsQ0FBQztZQUNKLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLElBQVk7UUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ2hELENBQUMsRUFBRSxFQUFFO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRXZELFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDaEQsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUk7UUFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDOUMsQ0FBQyxFQUFFLEVBQUU7WUFDTCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNwQixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNELENBQUE7QUFqRm9CLHNCQUFzQjtJQUQxQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7R0FDZCxzQkFBc0IsQ0FpRjFDO2VBakZvQixzQkFBc0IifQ==