import {TimelineLite, TweenLite, Power2, Power4} from 'gsap';
import AtomTweeningNumberElement from '../../atoms/atom-tweening-number/atom-tweening-number';
import AtomCandystripeBarElement from '../../atoms/atom-candystripe-bar/atom-candystripe-bar';
import {BidElement} from './gdq-break-bids';
import {ParentBid} from '../../../../src/types/index';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bid-challenge')
export default class GDQBreakBidChallengeElement extends Polymer.Element implements BidElement {
	@property({type: Object})
	bid: ParentBid;

	ready() {
		super.ready();
		const amountElem = this.$.amount as AtomTweeningNumberElement;

		amountElem.ease = Power2.easeOut;
		amountElem.displayValueTransform = displayValue => {
			if (displayValue >= this.bid.rawGoal) {
				amountElem.style.color = '#ff9100';
			}

			return '$' + displayValue.toLocaleString('en-US', {
				maximumFractionDigits: 0,
				useGrouping: false
			});
		};

		TweenLite.set(this, {opacity: 0});
	}

	enter() {
		let meterPercent = this.bid.rawTotal / this.bid.rawGoal;
		meterPercent = Math.max(meterPercent, 0); // Clamp to min 0
		meterPercent = Math.min(meterPercent, 1); // Clamp to max 1
		if (Number.isNaN(meterPercent)) {
			meterPercent = 0;
		}

		const tl = new TimelineLite();
		const meterDuration = meterPercent * 0.75;

		const progressElem = this.$['visual-progress'] as AtomCandystripeBarElement;
		progressElem.progress = meterPercent;

		tl.add(progressElem.reset());

		tl.call(() => {
			this.$.goal.textContent = '/ $' + this.bid.rawGoal.toLocaleString('en-US', {
				maximumFractionDigits: 0,
				useGrouping: false
			});
		}, undefined, null, '+=0.03');

		tl.to(this, 0.465, {
			opacity: 1,
			ease: Power4.easeIn
		});

		tl.addLabel('tween', '+=0');
		tl.add(progressElem.fill(meterDuration), 'tween');
		tl.add((this.$.amount as AtomTweeningNumberElement).tween(this.bid.rawTotal, meterDuration), 'tween');

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		tl.to(this, 0.2, {
			opacity: 0,
			ease: Power4.easeIn
		});

		return tl;
	}
}
