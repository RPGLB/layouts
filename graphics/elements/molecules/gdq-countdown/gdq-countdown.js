import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
const countdownRunning = nodecg.Replicant('countdownRunning');
const countdownTime = nodecg.Replicant('countdown');
const nowPlaying = nodecg.Replicant('nowPlaying');
/**
 * @customElement
 * @polymer
 */
let GDQCountdownElement = class GDQCountdownElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.countdownTimeline = new TimelineLite({ autoRemoveChildren: true });
        this._fooDebouncer = null;
        this._coldOpenStarted = true;
    }
    ready() {
        super.ready();
        TweenLite.set(this.$.countdown, { opacity: 0 });
        countdownRunning.on('change', newVal => {
            if (newVal) {
                this.showTimer();
            }
            else {
                this._debounceFoo();
            }
        });
        countdownTime.on('change', newVal => {
            this.$.countdownMinutesTens.innerText = String(Math.floor(newVal.minutes / 10));
            this.$.countdownMinutesOnes.innerText = String(newVal.minutes % 10);
            this.$.countdownSecondsTens.innerText = String(Math.floor(newVal.seconds / 10));
            this.$.countdownSecondsOnes.innerText = String(newVal.seconds % 10);
            if (newVal.raw <= 60000) {
                if (!this._didTweenRed) {
                    this._didTweenRed = true;
                    this._didTweenTeal = false;
                    TweenLite.to(this.$.countdown, 1, {
                        color: '#ED5A5A',
                        ease: Sine.easeInOut
                    });
                }
            }
            else if (!this._didTweenTeal) { // eslint-disable-line no-lonely-if
                this._didTweenRed = false;
                this._didTweenTeal = true;
                TweenLite.to(this.$.countdown, 1, {
                    color: '#00FFFF',
                    ease: Sine.easeInOut
                });
            }
            if (newVal.raw <= 60000 && newVal.raw > 0) {
                const currentSecond = Math.floor(newVal.raw / 1000);
                if (currentSecond !== this._soundTick) {
                    nodecg.playSound('tally');
                    this._soundTick = currentSecond;
                }
            }
            if (newVal.raw === 0 && this._coldOpenStarted === false) {
                this._coldOpenStarted = true;
                this.playOpen();
            }
            if (newVal.raw > 0 && this._coldOpenStarted === true) {
                this._coldOpenStarted = false;
            }
            if (newVal.raw <= 0) {
                this.$.countdown.classList.add('blink');
                this._debounceFoo();
            }
            else {
                this.$.countdown.classList.remove('blink');
            }
        });
        nowPlaying.on('change', newVal => {
            this.$.nowPlaying.textContent = `${newVal.game || '?'} - ${newVal.title || '?'}`;
        });
        this.$.coldopen.addEventListener('ended', () => {
            TweenLite.to(this.$.coldopen, 1, {
                delay: 2,
                opacity: 0,
                onComplete: () => {
                    this.$.coldopen.currentTime = 0;
                    TweenLite.set(this.$.coldopen, { opacity: 1 });
                }
            });
        });
    }
    playOpen() {
        this.$.coldopen.play();
    }
    showTimer() {
        if (!this._initialized) {
            this._initialized = true;
        }
        clearTimeout(this._fooTimeout);
        const tl = this.countdownTimeline;
        tl.add(createMaybeRandomTween({
            target: this.$.pressStart.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'flickerTotal');
        tl.set(this.$.countdown, { opacity: 1 });
        tl.staggerFromTo([
            this.$.countdownMinutesTens,
            this.$.countdownMinutesOnes,
            this.$.countdownColon,
            this.$.countdownSecondsTens,
            this.$.countdownSecondsOnes
        ], 0.001, {
            visibility: 'hidden'
        }, {
            visibility: 'visible'
        }, 0.03);
    }
    hideTimer() {
        if (!this._initialized) {
            this._initialized = true;
            return;
        }
        const tl = this.countdownTimeline;
        tl.add(createMaybeRandomTween({
            target: this.$.countdown.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'flickerTotal');
        tl.set(this.$.pressStart, { opacity: 1 });
    }
    _debounceFoo() {
        this._fooDebouncer = Polymer.Debouncer.debounce(this._fooDebouncer, Polymer.Async.timeOut.after(300), this._foo.bind(this));
    }
    _foo() {
        clearTimeout(this._fooTimeout);
        if (countdownRunning.value === false) {
            if (countdownTime.value && countdownTime.value.raw <= 0) {
                this._fooTimeout = window.setTimeout(() => {
                    this.hideTimer();
                }, 120);
            }
            else {
                this.hideTimer();
            }
        }
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQCountdownElement.prototype, "countdownTimeline", void 0);
GDQCountdownElement = tslib_1.__decorate([
    customElement('gdq-countdown')
], GDQCountdownElement);
export default GDQCountdownElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUUzRSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFtQixrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFDL0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYSxZQUFZLENBQUMsQ0FBQztBQUU5RDs7O0dBR0c7QUFFSCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMaEU7OztPQUdHO0lBQ0g7O1FBR2tCLHNCQUFpQixHQUFpQixJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFNeEYsa0JBQWEsR0FBNkIsSUFBSSxDQUFDO1FBQy9DLHFCQUFnQixHQUFHLElBQUksQ0FBQztJQTBKakMsQ0FBQztJQXZKQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBRTlDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFNB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