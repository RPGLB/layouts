import {Power2, TimelineLite, TweenLite} from 'gsap';
import AtomNameplateElement from '../../atoms/atom-nameplate/atom-nameplate';

const ENTRANCE_ANIM_DURATION = 0.5;
const ENTRANCE_ANIM_EASE = Power2.easeInOut;
const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-lowerthird-nameplate')
export default class GDQLowerthirdNameplateElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	header = false;

	@property({type: String, observer: GDQLowerthirdNameplateElement.prototype._nameChanged})
	name: string;

	@property({type: String})
	title: string;

	@property({type: Boolean, reflectToAttribute: true, computed: '_computeHasTitle(title)'})
	hasTitle: boolean;

	enter() {
		const tl = new TimelineLite();

		tl.call(() => {
			if (this.header) {
				(this.$.nameplate as AtomNameplateElement).updateName({alias: "#RPGLB2019", rotate: false});
			}
		});

		tl.to(this.$.name, ENTRANCE_ANIM_DURATION, {
			scaleX: 1,
			ease: ENTRANCE_ANIM_EASE
		}, 0);

		tl.to(this.$.title, 0.4, {
			y: '0%',
			ease: Power2.easeOut,
			onStart: () => {
				(this.$.title as HTMLDivElement).style.opacity = '1';
				(this.$['title-text'] as any).maxWidth = this.$.title.clientWidth - 60;
			}
		}, '-=0.1');

		return tl;
	}

	reset() {
		TweenLite.set(this.$.name, {scaleX: 0});
		TweenLite.set(this.$.title, {y: '-100%', opacity: 0});
	}

	_nameChanged(newVal: string) {
		return (this.$.nameplate as AtomNameplateElement).updateName({alias: newVal, rotate: false});
	}

	_computeHasTitle(title: string) {
		return Boolean(title && title.trim().length > 0);
	}
}
