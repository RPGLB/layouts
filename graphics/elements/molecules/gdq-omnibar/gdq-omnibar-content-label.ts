import {TimelineLite, Power3, Power2} from 'gsap';

const {customElement} = Polymer.decorators;
const ANCHOR_TWEEN_DURATION = 0.3;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-content-label')
export default class GDQOmnibarContentLabelElement extends Polymer.Element {
	enter(labelHtml: string) {
		labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment

		const tl = new TimelineLite();

		tl.fromTo(this.$.body, ANCHOR_TWEEN_DURATION, {
			y: 55
		}, {
			y: 0,
			ease: Power2.easeOut,
			onStart: () => {
				const textElem = this.$.text as HTMLDivElement;
				textElem.innerHTML = labelHtml;
			}
		});

		return tl;
	}

	change(labelHtml: string) {
		labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment

		const tl = new TimelineLite();

		tl.to(this.$.body, ANCHOR_TWEEN_DURATION, {
			y: 55,
			ease: Power2.easeIn,
			onComplete: () => {
				const textElem = this.$.text as HTMLDivElement;
				textElem.innerHTML = labelHtml;
			}
		});

		tl.to(this.$.body, ANCHOR_TWEEN_DURATION, {
			y: 0,
			ease: Power2.easeOut,
			delay: 0.2
		});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		tl.to(this, ANCHOR_TWEEN_DURATION, {
			y: 55,
			ease: Power3.easeInOut
		});

		return tl;
	}

	processLabelHtml(labelHtml: string) {
		return labelHtml.replace(/\\n/g, '<br/>');
	}
}
