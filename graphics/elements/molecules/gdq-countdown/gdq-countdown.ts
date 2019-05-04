import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';
import { Countdown } from '../../../../src/types/schemas/countdown';

const {customElement} = Polymer.decorators;

const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');
const countdownTimer = nodecg.Replicant<Countdown>('nowPlaying');

@customElement('gdq-countdown')
export default class RPGLBOmnibarBreakinfoElement extends Polymer.Element {
	music = ''
	timer = ''

	connectedCallback() {
		super.connectedCallback();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			nowPlaying.on('change', newVal => {
				this.music = `${newVal.game || '?'} - ${newVal.title || '?'}`
			});
			countdownTimer.on('change', ({minutes, seconds}) => {
				this.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
			})
		});
	}
}
