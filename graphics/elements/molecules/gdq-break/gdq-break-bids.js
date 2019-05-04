import * as tslib_1 from "tslib";
import { TimelineLite, Sine, Power2 } from 'gsap';
import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
const { customElement } = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentBids = nodecg.Replicant('currentBids');
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidsElement = class GDQBreakBidsElement extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        super.ready();
        this.maxNoMoreItemsRetries = 30;
        currentBids.on('change', newVal => {
            this.availableItems = newVal;
        });
    }
    show() {
        const tl = new TimelineLite();
        tl.to(this, 0.333, {
            opacity: 1,
            ease: Sine.easeInOut
        }, 0);
        tl.to(this, 1, {
            x: '0%',
            ease: Power2.easeOut
        }, 0);
        return tl;
    }
    hide() {
        const tl = new TimelineLite();
        tl.to(this, 1, {
            x: '-100%',
            ease: Power2.easeIn
        });
        tl.to(this, 0.333, {
            opacity: 0,
            ease: Sine.easeInOut
        }, '-=0.333');
        return tl;
    }
    _showItem(bid) {
        let elementTagName;
        if (bid.type === 'choice-many') {
            elementTagName = 'gdq-break-bid-many';
        }
        else if (bid.type === 'choice-binary') {
            elementTagName = 'gdq-break-bid-binary';
        }
        else if (bid.type === 'challenge') {
            elementTagName = 'gdq-break-bid-challenge';
        }
        else {
            nodecg.log.error('Got bid of unexpected type (%s):', bid.type, JSON.stringify(bid, null, 2));
        }
        const tl = new TimelineLite();
        if (!elementTagName) {
            return tl;
        }
        const previousElement = this._previousBidElement;
        const element = document.createElement(elementTagName);
        element.bid = bid;
        this._previousBidElement = element;
        this.$.content.appendChild(element);
        if (previousElement) {
            tl.add(previousElement.exit());
            tl.call(() => {
                previousElement.remove();
            });
        }
        tl.call(() => {
            const contentElem = this.$.content;
            contentElem.selectIndex(contentElem.indexOf(element));
            this.$['game-name'].innerHTML = bid.speedrun.replace(/\\n/g, '</br>');
            this.$['description-actual'].innerHTML = bid.name.replace(/\\n/g, '</br>');
        }, undefined, null, '+=0.1');
        tl.add(element.enter());
        // Give the bid some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
};
GDQBreakBidsElement = tslib_1.__decorate([
    customElement('gdq-break-bids')
], GDQBreakBidsElement);
export default GDQBreakBidsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8saUJBQWlCLE1BQU0sc0NBQXNDLENBQUM7QUFHckUsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFRM0MsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFDN0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYyxhQUFhLENBQUMsQ0FBQztBQUVqRTs7O0dBR0c7QUFFSCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBWTtJQUc3RixLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtZ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