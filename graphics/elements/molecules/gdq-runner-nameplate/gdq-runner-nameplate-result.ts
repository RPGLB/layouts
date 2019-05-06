import { TimelineLite, Power3 } from 'gsap';

const {customElement, property} = Polymer.decorators;

@customElement('gdq-runner-nameplate-result')
export default class GDQNameplateResultElement extends Polymer.Element {
	@property({type: Boolean, observer: '_showingChanged'})
	showing: boolean;

	@property({type: String, reflectToAttribute: true})
	side: string;

	@property({type: Number})
	place: number;

	@property({type: String})
	time: string;

	@property({type: Boolean, reflectToAttribute: true})
	firstPlace: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	lastPlace: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	forfeit: boolean;

	_showingChanged(showing: boolean) {
		if (showing) {
			const tl = new TimelineLite()
			tl.to(this, 0.5, {
				transform: this.side === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
				ease: Power3.easeInOut
			})
			if (!this.forfeit) {
				tl.to(this.$.placeWrapper, 0.5, {
					transform: this.side === 'left' ? 'translateX(-20px)' : 'translateX(20px)',
					ease: Power3.easeInOut
				})
			}
		} else {
			const tl = new TimelineLite()
			tl.to(this, 0.5, {
				transform: 'translateX(0)',
				ease: Power3.easeInOut
			})
			tl.to(this.$.placeWrapper, 0.5, {
				transform: 'translateX(0)',
				ease: Power3.easeInOut
			})
		}
	}
}
