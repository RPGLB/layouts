import * as tslib_1 from "tslib";
import { TweenLite, TimelineLite, Sine, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const RIGHT_TIME_PER_PIXEL = 0.00107;
/**
 * @customElement
 * @polymer
 */
let RPGLBOmnibarChallengeElement = class RPGLBOmnibarChallengeElement extends Polymer.Element {
    ready() {
        super.ready();
    }
    enter() {
        const tl = new TimelineLite();
        tl.fromTo(this, 0.234, {
            y: 55,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Sine.easeOut
        });
        let progressPercentage = this.bid.rawTotal / this.bid.rawGoal;
        progressPercentage = Math.min(progressPercentage, 1); // Clamp to 1 max.
        progressPercentage = Math.max(progressPercentage, 0); // Clamp to 0 min.
        const progressElem = this.$.progress;
        const progressFillWidth = this.getBoundingClientRect().width * progressPercentage;
        this._progressTweenDuration = progressFillWidth * RIGHT_TIME_PER_PIXEL;
        const totalElem = this.$.total;
        const totalTextCanFitOnLeft = (progressFillWidth - 7) >= (totalElem.clientWidth + 24);
        if (totalTextCanFitOnLeft) {
            totalElem.style.left = 'unset';
            totalElem.style.textAlign = 'right';
            TweenLite.set(totalElem, { right: 6 });
        }
        else {
            totalElem.style.right = 'unset';
            totalElem.style.textAlign = 'left';
            TweenLite.set(totalElem, { left: progressFillWidth + 6 });
        }
        tl.addLabel('fillProgress', '+=0');
        tl.to(progressElem, this._progressTweenDuration, {
            width: progressFillWidth,
            ease: Power2.easeIn
        }, 'fillProgress');
        tl.to(totalElem, 0.465, {
            opacity: 1,
            ease: Sine.easeIn
        }, 'fillProgress');
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.to(this, 0.465, {
            y: 55,
            opacity: 0,
            ease: Sine.easeIn
        });
        return tl;
    }
    render() {
    }
};
tslib_1.__decorate([
    property({ type: Object })
], RPGLBOmnibarChallengeElement.prototype, "bid", void 0);
RPGLBOmnibarChallengeElement = tslib_1.__decorate([
    customElement('rpglb-omnibar-challenge')
], RPGLBOmnibarChallengeElement);
export default RPGLBOmnibarChallengeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBnbGItb21uaWJhci1jaGFsbGVuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJycGdsYi1vbW5pYmFyLWNoYWxsZW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUM7QUFFckM7OztHQUdHO0FBRUgsSUFBcUIsNEJBQTRCLEdBQWpELE1BQXFCLDRCQUE2QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTXhFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNKLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3RCLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDVixFQUFFO1lBQ0YsQ0FBQyxFQUFFLENBQUM7WUFDSixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTztTQUNsQixDQUFDLENBQUM7UUFFSCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzlELGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7UUFDeEUsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtRQUV4RSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQTBCLENBQUM7UUFDdkQsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7UUFDbEYsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDO1FBRXZFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBdUIsQ0FBQztRQUNqRCxNQUFNLHFCQUFxQixHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLElBQUkscUJBQXFCLEVBQUU7WUFDMUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUNwQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTixTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7WUFDaEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDaEQsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDbkIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVuQixFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDakIsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVuQixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDbEIsQ0FBQyxFQUFFLEVBQUU7WUFDTCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNqQixDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNO0lBQ04sQ0FBQztDQUNELENBQUE7QUFwRUE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7eURBQ1Y7QUFGSyw0QkFBNEI7SUFEaEQsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0dBQ3BCLDRCQUE0QixDQXNFaEQ7ZUF0RW9CLDRCQUE0QiJ9