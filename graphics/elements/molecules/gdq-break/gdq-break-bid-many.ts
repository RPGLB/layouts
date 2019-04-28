import {TimelineLite, Power4} from 'gsap';
import {BidElement} from './gdq-break-bids';
import {ParentBid} from '../../../../src/types/index';
import GDQBreakBidManyOptionElement from './gdq-break-bid-many-option';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bid-many')
export default class GDQBreakBidManyElement extends Polymer.Element implements BidElement {
	@property({type: Object})
	bid: ParentBid;

	enter() {
		(this.$.optionRepeat as Polymer.DomRepeat).render();

		const tl = new TimelineLite();
		const optionElements = Array.from(this.shadowRoot!.querySelectorAll('gdq-break-bid-many-option')) as GDQBreakBidManyOptionElement[];

		tl.addLabel('showOptions', '+=0');
		optionElements.forEach((optionElement, index) => {
			optionElement.style.opacity = '0';
			tl.to(optionElement, 0.465, {
				opacity: 1,
				ease: Power4.easeIn
			}, `showOptions+=${index * 0.1}`);
		});

		tl.addLabel('enterOptions', '+=0');
		optionElements.forEach((optionElement, index) => {
			tl.add(optionElement.enter(), `enterOptions+=${index * 0.1}`);
		});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		const optionElements = Array.from(this.shadowRoot!.querySelectorAll('gdq-break-bid-many-option')) as GDQBreakBidManyOptionElement[];

		tl.addLabel('hideOptions', '+=0');
		optionElements.slice(0).reverse().forEach((optionElement, index) => {
			tl.to(optionElement, 0.2, {
				opacity: 0,
				ease: Power4.easeIn
			}, `hideOptions+=${index * 0.1}`);
		});

		return tl;
	}

	_calcOptions(bid: ParentBid) {
		if (!bid) {
			return [];
		}

		return bid.options.slice(0, 3);
	}
}
