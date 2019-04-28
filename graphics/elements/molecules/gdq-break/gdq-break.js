import * as tslib_1 from "tslib";
import { TweenLite, Power1 } from 'gsap';
import PQueue from '../../../../shared/lib/vendor/p-queue';
const { customElement, property } = Polymer.decorators;
const FADE_DURATION = 0.334;
const FADE_OUT_EASE = Power1.easeIn;
const FADE_IN_EASE = Power1.easeOut;
const currentHost = nodecg.Replicant('currentHost');
const nowPlaying = nodecg.Replicant('nowPlaying');
/**
 * @customElement
 * @polymer
 */
let GDQBreakElement = class GDQBreakElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._queue = new PQueue({ concurrency: 1 });
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.afterNextRender(this, () => {
            const tweetElem = this.$.tweet;
            tweetElem.companionElement = this.$.prizes;
            this._setupInterrupt({
                messageName: 'showTweet',
                interruptElement: tweetElem
            });
            currentHost.on('change', newVal => {
                this._changeText(this.$.host, newVal);
            });
            nowPlaying.on('change', newVal => {
                this._changeText(this.$.music, `${newVal.title || '?'} [${newVal.game || '?'}]`);
            });
        });
    }
    _changeText(element, newText) {
        TweenLite.to(element, FADE_DURATION, {
            opacity: 0,
            ease: FADE_OUT_EASE,
            callbackScope: this,
            onComplete() {
                element.text = newText;
                TweenLite.to(element, FADE_DURATION, {
                    opacity: 1,
                    ease: FADE_IN_EASE,
                    delay: 0.05
                });
            }
        });
    }
    _setupInterrupt({ messageName, interruptElement }) {
        let queued = false;
        let queue = [];
        nodecg.listenFor(messageName, payload => {
            if (interruptElement.canExtend) {
                interruptElement.playItem(payload);
                return;
            }
            if (queued) {
                queue.push(payload);
            }
            else {
                queued = true;
                this._queue.add(async () => {
                    interruptElement.addEventListener('can-extend', () => {
                        queue.forEach(queuedFanart => {
                            interruptElement.playItem(queuedFanart);
                        });
                        queued = false;
                        queue = [];
                    }, { once: true, passive: true });
                    return this._promisifyTimeline(interruptElement.playItem(payload));
                }).catch(error => {
                    nodecg.log.error(error);
                });
            }
        });
    }
    async _promisifyTimeline(tl) {
        return new Promise(resolve => {
            tl.call(resolve, undefined, null, '+=0.03');
        });
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakElement.prototype, "_queue", void 0);
GDQBreakElement = tslib_1.__decorate([
    customElement('gdq-break')
], GDQBreakElement);
export default GDQBreakElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWUsU0FBUyxFQUFlLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsRSxPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQUkzRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzVCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDcEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUVwQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFjLGFBQWEsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFFOUQ7OztHQUdHO0FBRUgsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDVEOzs7T0FHRztJQUNIOztRQUdDLFdBQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBeUUvQyxDQUFDO0lBdkVBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQy9DLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBd0IsQ0FBQztZQUNsRCxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUEyQixDQUFDO1lBRWhFLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3BCLFdBQVcsRUFBRSxXQUFXO2dCQUN4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