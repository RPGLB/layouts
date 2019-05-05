import {TimelineLite, Sine} from 'gsap';
import InterruptMixin, {ICompanionElement} from '../../../mixins/interrupt-mixin';
import {Tweet} from '../../../../src/types/Twitter';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-tweet')
export default class GDQTweetElement extends InterruptMixin(Polymer.Element) {
	@property({type: String})
	label = '';

	@property({type: Object})
	companionElement: (ICompanionElement | null) = document.querySelector('gdq-sponsors');

	@property({type: String})
	bindToMessage = 'showTweet';

	@property({type: Number})
	backgroundOpacity = 0.25;

	_initialized: boolean;

	ready() {
		super.ready();
		this._addReset();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			const layoutAppElement = document.querySelector('layout-app');
			if (!this.companionElement && layoutAppElement) {
				const sponsorsElement = layoutAppElement.shadowRoot!.querySelector('gdq-sponsors');
				if (sponsorsElement) {
					this.companionElement = sponsorsElement as ICompanionElement;
				}
			}
		});
	}

	/**
	 * Adds a reset to the master timeline.
	 */
	_addReset() {
		const tl = this.timeline;
		tl.call(() => {
			this.$['body-actual'].innerHTML = '';
			this.$.name.innerHTML = '';
		}, undefined, null, '+=0.03');
		tl.set([this.$.label, this.$.name], {scaleX: 0, color: 'transparent', clipPath: ''});
		tl.set(this.$['body-actual'], {opacity: 1});
	}

	/**
	 * Creates an entrance animation timeline.
	 * @param tweet - The tweet to enter.
	 * @returns A GSAP animation timeline.
	 */
	_createEntranceAnim(tweet: Tweet) {
		const tl = new TimelineLite();

		tl.addLabel('start', '+=0.03');

		tl.call(() => {
			(this.$.name as HTMLDivElement).innerText = `@${tweet.user.screen_name}`;
		}, undefined, null, 'start');

		tl.to(this.$.name, 0.334, {
			scaleX: 1,
			ease: Sine.easeInOut,
			onComplete: () => {
				(this.$.name as HTMLDivElement).style.color = '';
			}
		}, 'start+=0.05');

		tl.to(this.$.label, 0.334, {
			scaleX: 1,
			ease: Sine.easeInOut,
			onComplete: () => {
				(this.$.label as HTMLDivElement).style.color = '';
			}
		}, 'start+=0.4');

		tl.call(() => {
			this.$['body-actual'].innerHTML = tweet.text;
		});

		return tl;
	}

	/**
	 * Creates an animation for changing the currently displayed tweet.
	 * This is only used when hot-swapping tweets
	 * (i.e., changing tweets while the graphic is already showing).
	 * @param tweet - The new tweet to show.
	 * @returns A GSAP animation timeline.
	 */
	_createChangeAnim(tweet: Tweet) {
		const tl = new TimelineLite();
		let exitedPreviousTweet = false;

		tl.call(() => {
			if (exitedPreviousTweet) {
				return;
			}

			tl.pause();
			const exitTextTl = new TimelineLite();
			exitTextTl.call(() => {
				exitedPreviousTweet = true;
				tl.resume();
			});
		}, undefined, null, '+=0.03');

		tl.call(() => {
			(this.$.name as HTMLDivElement).innerText = `@${tweet.user.screen_name}`;
			this.$['body-actual'].innerHTML = tweet.text;

		}, undefined, null, '+=0.03');

		return tl;
	}

	/**
	 * Creates an exit animation timeline.
	 * @returns A GSAP animation timeline.
	 */
	_createExitAnim() {
		const tl = new TimelineLite();

		tl.add('exit');

		tl.add(createMaybeRandomTween({
			target: (this.$['body-actual'] as HTMLDivElement).style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 0}
		}), 'exit');

		tl.fromTo(this.$.label, 0.334, {
			clipPath: 'inset(0 0% 0 0)'
		}, {
			clipPath: 'inset(0 100% 0 0)',
			ease: Sine.easeInOut
		}, 'exit+=0.9');

		tl.fromTo(this.$.name, 0.334, {
			clipPath: 'inset(0 0 0 0%)'
		}, {
			clipPath: 'inset(0 0 0 100%)',
			ease: Sine.easeInOut
		}, 'exit+=1.3');

		return tl;
	}

	resize() {
		if (!this._initialized) {
			return;
		}
	}

	_falsey(value: any) {
		return !value;
	}
}
