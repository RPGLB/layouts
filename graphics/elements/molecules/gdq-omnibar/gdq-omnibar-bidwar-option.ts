import {TimelineLite, Sine} from 'gsap';
import {ChildBid} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-bidwar-option')
export default class GDQOmnibarBidwarOptionElement extends Polymer.Element {
	@property({type: Object})
	bid: ChildBid;

	@property({type: Boolean, reflectToAttribute: true})
	placeholder: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	winning: boolean;

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

	formatOptionDescription(bid: ChildBid) {
		const fallback = 'Be the first to bid!';
		if (bid && !(bid.description || bid.name)) {
			nodecg.log.error('Got weird bid war option:', JSON.stringify(bid, null, 2));
			return fallback;
		}

		return bid ? (bid.description || bid.name) : fallback;
	}
}
