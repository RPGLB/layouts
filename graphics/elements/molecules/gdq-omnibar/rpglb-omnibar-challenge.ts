import {ParentBid} from '../../../../src/types';
import {TweenLite, TimelineLite, Sine, Power2} from 'gsap';

const {customElement, property} = Polymer.decorators;

const RIGHT_TIME_PER_PIXEL = 0.00107;

/**
 * @customElement
 * @polymer
 */
@customElement('rpglb-omnibar-challenge')
export default class RPGLBOmnibarChallengeElement extends Polymer.Element {
	@property({type: Object})
	bid: ParentBid;

	private _progressTweenDuration: number;

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

		const progressElem = this.$.progress as HTMLDivElement;
		const progressFillWidth = this.getBoundingClientRect().width * progressPercentage;
		this._progressTweenDuration = progressFillWidth * RIGHT_TIME_PER_PIXEL;

		const totalElem = this.$.total as HTMLDivElement;
		const totalTextCanFitOnLeft = (progressFillWidth - 7) >= (totalElem.clientWidth + 24);
		if (totalTextCanFitOnLeft) {
			totalElem.style.left = 'unset';
			totalElem.style.textAlign = 'right';
			TweenLite.set(totalElem, {right: 6});
		} else {
			totalElem.style.right = 'unset';
			totalElem.style.textAlign = 'left';
			TweenLite.set(totalElem, {left: progressFillWidth + 6});
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
}
