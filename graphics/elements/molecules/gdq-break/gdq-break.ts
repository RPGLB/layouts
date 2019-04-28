import {TimelineLite, TweenLite, TimelineMax, Power1} from 'gsap';
import {ICompanionElement, IInterruptMixin} from '../../../mixins/interrupt-mixin';
import PQueue from '../../../../shared/lib/vendor/p-queue';
import {CurrentHost} from '../../../../src/types/schemas/currentHost';
import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';

const {customElement, property} = Polymer.decorators;

const FADE_DURATION = 0.334;
const FADE_OUT_EASE = Power1.easeIn;
const FADE_IN_EASE = Power1.easeOut;

const currentHost = nodecg.Replicant<CurrentHost>('currentHost');
const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break')
export default class GDQBreakElement extends Polymer.Element {
	@property({type: Object})
	_queue: PQueue = new PQueue({concurrency: 1});

	connectedCallback() {
		super.connectedCallback();
		Polymer.RenderStatus.afterNextRender(this, () => {
			const tweetElem = this.$.tweet as IInterruptMixin;
			tweetElem.companionElement = this.$.prizes as ICompanionElement;

			this._setupInterrupt({
				messageName: 'showTweet',
				interruptElement: tweetElem
			});

			currentHost.on('change', newVal => {
				this._changeText(this.$.host as HTMLElement, newVal);
			});

			nowPlaying.on('change', newVal => {
				this._changeText(this.$.music as HTMLElement, `${newVal.title || '?'} [${newVal.game || '?'}]`);
			});
		});
	}

	_changeText(element: HTMLElement, newText: string) {
		TweenLite.to(element, FADE_DURATION, {
			opacity: 0,
			ease: FADE_OUT_EASE,
			callbackScope: this,
			onComplete() {
				(element as any).text = newText;
				TweenLite.to(element, FADE_DURATION, {
					opacity: 1,
					ease: FADE_IN_EASE,
					delay: 0.05
				});
			}
		});
	}

	_setupInterrupt({messageName, interruptElement}: { messageName: string; interruptElement: IInterruptMixin }) {
		let queued = false;
		let queue: unknown[] = [];
		nodecg.listenFor(messageName, payload => {
			if (interruptElement.canExtend) {
				interruptElement.playItem(payload);
				return;
			}

			if (queued) {
				queue.push(payload);
			} else {
				queued = true;
				this._queue.add(async () => {
					interruptElement.addEventListener('can-extend', () => {
						queue.forEach(queuedFanart => {
							interruptElement.playItem(queuedFanart);
						});
						queued = false;
						queue = [];
					}, {once: true, passive: true});
					return this._promisifyTimeline(interruptElement.playItem(payload));
				}).catch(error => {
					nodecg.log.error(error);
				});
			}
		});
	}

	async _promisifyTimeline(tl: TimelineLite | TimelineMax) {
		return new Promise(resolve => {
			tl.call(resolve, undefined, null, '+=0.03');
		});
	}
}
