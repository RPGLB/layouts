import {TimelineLite, Sine, SlowMo} from 'gsap';

const {customElement} = Polymer.decorators;

const FLAG_ENTRANCE_DURATION = 0.334;

@customElement('gdq-omnibar-label')
export default class GDQOmnibarLabelElement extends Polymer.Element {
	_showing: boolean;

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
	show(text: string) {
		const showTL = new TimelineLite();

		showTL.set(this.$['flag-text'], {textContent: text});

		showTL.fromTo(this.$.flag, FLAG_ENTRANCE_DURATION, {
			y: 55,
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
	change(text: string) {
		const changeTL = new TimelineLite();

		changeTL.to(this.$.flag, FLAG_ENTRANCE_DURATION, {
			y: 55,
			ease: Sine.easeInOut
		});

		changeTL.set(this.$['flag-text'], {textContent: text});

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
			y: 55,
			opacity: 0,
			ease: Sine.easeInOut
		});

		hideTL.call(() => {
			this._showing = false;
		});

		return hideTL;
	}
}
