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
            this.availableItems = newVal.filter(bid => bid.type === 'choice-binary');
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
        console.log(Object.assign({}, bid));
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
            this.$['game-name'].text = bid.speedrun.replace(/\\n/g, ' ');
            this.$['description-actual'].text = bid.name.replace(/\\n/g, ' ');
        }, undefined, null, '+=0.1');
        tl.add(element.enter && element.enter());
        // Give the bid some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
};
GDQBreakBidsElement = tslib_1.__decorate([
    customElement('gdq-break-bids')
], GDQBreakBidsElement);
export default GDQBreakBidsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8saUJBQWlCLE1BQU0sc0NBQXNDLENBQUM7QUFHckUsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFRM0MsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFDN0QsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYyxhQUFhLENBQUMsQ0FBQztBQUVqRTs7O0dBR0c7QUFFSCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBWTtJQUc3RixLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNoQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUk7UUFDSCxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNsQixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNwQixF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