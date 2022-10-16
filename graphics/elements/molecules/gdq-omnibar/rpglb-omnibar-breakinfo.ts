import {TweenLite, Sine} from 'gsap'
import AtomNameplateElement from '../../atoms/atom-nameplate/atom-nameplate';
import {CurrentHost} from '../../../../src/types/schemas/currentHost';
import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';

const {customElement} = Polymer.decorators;

const currentHost = nodecg.Replicant<CurrentHost>('currentHost');
const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');

@customElement('rpglb-omnibar-breakinfo')
export default class RPGLBOmnibarBreakinfoElement extends Polymer.Element {
	private _showing = false;

	connectedCallback() {
		super.connectedCallback();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			currentHost.on('change', newVal => {
				(this.$.host as AtomNameplateElement).updateName({alias: newVal});
			});

			nowPlaying.on('change', newVal => {
				(this.$.music as AtomNameplateElement).updateName({alias: `${newVal.game || '?'} - ${newVal.title || '?'}`});
			});
		});
	}

	enter() {
		if (this._showing) {
			return;
		}

		return TweenLite.fromTo(this, 0.466, {
			y: 84,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			ease: Sine.easeInOut,
			onComplete: () => {
				this._showing = true;
			}
		});
	}

	exit() {
		if (!this._showing) {
			return;
		}

		return TweenLite.fromTo(this, 0.466, {
			y: 0,
			opacity: 1,
		}, {
			y: 84,
			opacity: 0,
			ease: Sine.easeInOut,
			onStart: () => {
				this._showing = false;
			}
		});
	}
}
