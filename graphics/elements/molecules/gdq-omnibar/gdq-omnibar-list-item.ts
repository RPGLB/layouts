import {Sine, TimelineLite} from 'gsap';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-list-item')
export default class GDQOmnibarListItemElement extends Polymer.Element {
	@property({type: String})
	firstLine: string;

	@property({type: String})
	secondLine: string;

	ready() {
		super.ready();
	}

	enter() {
		const enterTL = new TimelineLite();

		enterTL.fromTo(this, 0.234, {
			y: 55,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			ease: Sine.easeOut
		});

		return enterTL;
	}

	exit() {
		const exitTL = new TimelineLite();

		exitTL.to(this, 0.465, {
			y: 55,
			opacity: 0,
			ease: Sine.easeIn
		});

		return exitTL;
	}
}
