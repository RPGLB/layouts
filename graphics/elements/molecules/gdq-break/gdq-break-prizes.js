import * as tslib_1 from "tslib";
import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import { TimelineLite, Power2, Sine, TweenLite } from 'gsap';
import { preloadImage } from '../../../../shared/lib/gdq-utils';
const { customElement } = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentPrizes = nodecg.Replicant('currentPrizes');
/**
 * @customElement
 * @polymer
 */
let GDQBreakPrizesElement = class GDQBreakPrizesElement extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        super.ready();
        currentPrizes.on('change', newVal => {
            this.availableItems = newVal;
        });
    }
    /**
     * Plays the entrance animation and kicks off the infinite loop of
     * showing all available prizes, one at a time.
     * @returns - A GSAP TimelineLite instance.
     */
    show() {
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        tl.call(() => {
            // Clear all content.
            this.$['info-description-text'].innerText = '';
            this.$['info-minimumBid-text'].innerText = '';
            this.$.provider.innerText = '';
            photoElem.$svg.image.load('');
        }, undefined, null, '+=0.03');
        tl.addLabel('start', '+=0');
        tl.to(photoElem.$svg.bgRect.node, 1.5, {
            drawSVG: '100%',
            ease: Power2.easeOut
        }, 'start');
        tl.to(this.$.info, 1, {
            x: '0%',
            ease: Power2.easeOut
        }, 'start+=0.5');
        tl.to(this.$['photo-label'], 0.5, {
            opacity: 1,
            x: 0,
            ease: Sine.easeOut
        }, 'start+=1');
        tl.to(photoElem.$svg.bgRect.node, 0.5, {
            'fill-opacity': 0.25,
            ease: Sine.easeOut
        }, 'start+=1');
        tl.call(() => {
            // Re-start the loop once we've finished entering.
            this._loop();
        });
        return tl;
    }
    /**
     * Plays the exit animation and kills the current loop of prize displaying.
     * This animation has a variable length due to it needing to wait for the current
     * loop to be at a good stopping point before beginning the exit animation.
     * @returns - A GSAP TimelineLite instance.
     */
    hide() {
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        let handledCall = false; // GSAP likes to run .calls again when you .resume
        tl.call(() => {
            if (handledCall) {
                return;
            }
            handledCall = true;
            tl.pause();
            if (photoElem.exiting) {
                photoElem.addEventListener('exited', () => {
                    this._killLoop();
                    tl.resume();
                }, { once: true, passive: true });
            }
            else if (photoElem.entering) {
                photoElem.addEventListener('entered', () => {
                    this._killLoop();
                    photoElem.exit({
                        onComplete: () => {
                            tl.resume();
                        }
                    });
                }, { once: true, passive: true });
            }
            else {
                this._killLoop();
                photoElem.exit({
                    onComplete: () => {
                        tl.resume();
                    }
                });
            }
        }, undefined, null, '+=0.1');
        tl.addLabel('start', '+=0.5');
        tl.call(() => {
            this.currentItem = null;
        }, undefined, null, 'start');
        tl.to(photoElem.$svg.bgRect.node, 0.5, {
            'fill-opacity': 0,
            ease: Sine.easeIn
        }, 'start');
        tl.to(this.$['photo-label'], 0.5, {
            opacity: 0,
            x: -50,
            ease: Sine.easeIn
        }, 'start');
        tl.to(this.$.info, 1, {
            x: '-100%',
            ease: Power2.easeIn
        }, 'start');
        tl.to(photoElem.$svg.bgRect.node, 1.5, {
            drawSVG: '0%',
            ease: Power2.easeIn
        }, 'start');
        return tl;
    }
    _showItem(prize) {
        let useFallbackImage = !prize.image || !prize.image.trim();
        let changingProvider = true;
        let changingMinimumBid = true;
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        const providerTextElem = this.$.provider;
        const descriptionTextElem = this.$['info-description-text'];
        const minimumBidTextElem = this.$['info-minimumBid-text'];
        const minimumBidText = prize.sumdonations ?
            `${prize.minimumbid} in Total Donations` :
            `${prize.minimumbid} Single Donation`;
        tl.call(() => {
            tl.pause();
            preloadImage(prize.image).then(() => {
                tl.resume();
            }).catch(() => {
                nodecg.log.error(`Image "${prize.image}" failed to load for prize #${prize.id}.`);
                useFallbackImage = true;
                tl.resume();
            });
        }, undefined, null, '+=0.03');
        tl.addLabel('exit', '+=0');
        tl.add(photoElem.exit({
            onComplete: () => {
                const newSrc = useFallbackImage ? photoElem.fallbackSrc : prize.image;
                tl.pause();
                photoElem.$svg.image.load(newSrc).loaded(() => {
                    tl.resume();
                }).error(error => {
                    nodecg.log.error(error);
                    photoElem.$svg.image.load(photoElem.fallbackSrc);
                    tl.resume();
                });
            }
        }), 'exit');
        tl.call(() => {
            if (!providerTextElem.innerText && !descriptionTextElem.innerText) {
                return;
            }
            changingProvider = false;
            if (providerTextElem.innerText.trim() !== prize.provided) {
                changingProvider = true;
                TweenLite.to(this.$.provider, 0.5, {
                    opacity: 0,
                    ease: Sine.easeInOut
                });
            }
            changingMinimumBid = false;
            if (minimumBidTextElem.innerText.trim() !== minimumBidText) {
                changingMinimumBid = true;
                TweenLite.to(minimumBidTextElem, 0.5, { opacity: 0, ease: Sine.easeInOut });
            }
            TweenLite.to(this.$['info-description-text'], 0.5, {
                opacity: 0,
                ease: Sine.easeInOut
            });
        }, undefined, null, 'exit+=0.1');
        tl.addLabel('enter', '+=0');
        tl.call(() => {
            if (!changingProvider) {
                return;
            }
            providerTextElem.innerText = prize.provided;
            TweenLite.set(providerTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.03');
        tl.add(photoElem.enter(), 'enter+=0.1');
        tl.call(() => {
            descriptionTextElem.innerText = prize.description;
            TweenLite.set(descriptionTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.2');
        tl.call(() => {
            if (!changingMinimumBid) {
                return;
            }
            minimumBidTextElem.innerText = minimumBidText;
            TweenLite.set(minimumBidTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.3');
        // Give the prize some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
    _resetState() {
        this.$['photo-actual'].exiting = false;
    }
};
GDQBreakPrizesElement = tslib_1.__decorate([
    customElement('gdq-break-prizes')
], GDQBreakPrizesElement);
export default GDQBreakPrizesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXByaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1wcml6ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8saUJBQWlCLE1BQU0sc0NBQXNDLENBQUM7QUFFckUsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFFOUQsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFM0MsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFFN0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxlQUFlLENBQUMsQ0FBQztBQUVqRTs7O0dBR0c7QUFFSCxJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXNCLFNBQVEsaUJBQWlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBUTtJQUMzRixLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUk7UUFDSCxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUE2QixDQUFDO1FBRXJFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1oscUJBQXFCO1lBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQXVC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