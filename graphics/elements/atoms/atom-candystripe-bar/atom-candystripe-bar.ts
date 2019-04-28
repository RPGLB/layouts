import {TweenLite, Power2} from 'gsap';
const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-candystripe-bar')
export default class AtomCandystripeBarElement extends Polymer.Element {
	@property({type: Number})
	progress = 0;

	_tween: TweenLite | null = null;

	_killTween() {
		if (this._tween) {
			this._tween.kill();
			this._tween = null;
		}
	}

	reset() {
		this._killTween();
		return TweenLite.set(this.$['progress-bar'], {width: '0%'});
	}

	fill(duration: number) {
		this._killTween();

		const progressWidth = (this.progress * 100) + '%';

		this._tween = TweenLite.to(this.$['progress-bar'], duration, {
			width: progressWidth,
			ease: Power2.easeOut
		});

		return this._tween;
	}
}
