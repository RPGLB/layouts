import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';

const {customElement} = Polymer.decorators;

const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');

@customElement('gdq-countdown')
export default class RPGLBOmnibarBreakinfoElement extends Polymer.Element {
	music = ''

	connectedCallback() {
		super.connectedCallback();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			nowPlaying.on('change', newVal => {
				this.music = `${newVal.game || '?'} - ${newVal.title || '?'}`
			});
		});
	}
}
