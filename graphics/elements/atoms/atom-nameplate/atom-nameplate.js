import * as tslib_1 from "tslib";
import { Power1, TimelineMax, TweenLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const NAME_FADE_IN_EASE = Power1.easeOut;
const NAME_FADE_OUT_EASE = Power1.easeIn;
let AtomNameplateElement = class AtomNameplateElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.noLeftCap = false;
        this.noRightCap = false;
        this.left = true;
        this.right = false;
        this.noCap = false;
        this.noIcon = false;
        this.name = '';
        this.twitch = '';
        /**
         * How long, in seconds, to fade names in/out.
         *
         * For example, a value of 0.33 means that the fade out will take 0.33
         * seconds, and then the subsequent fade in will take another 0.33 seconds.
         */
        this.nameFadeDuration = 0.33;
        this._nameTL = new TimelineMax({ repeat: -1, paused: true });
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
            this.shadowRoot.querySelectorAll('sc-fitted-text').forEach((node) => {
                node.$.fittedContent.style.webkitBackgroundClip = 'text';
            });
            // Create looping anim for main nameplate.
            this._nameTL.to(this.$.names, this.nameFadeDuration, {
                onStart: () => {
                    this.$.namesTwitch.classList.remove('hidden');
                    this.$.namesName.classList.add('hidden');
                },
                opacity: 1,
                ease: NAME_FADE_IN_EASE
            });
            this._nameTL.to(this.$.names, this.nameFadeDuration, {
                opacity: 0,
                ease: NAME_FADE_OUT_EASE
            }, '+=10');
            this._nameTL.to(this.$.names, this.nameFadeDuration, {
                onStart: () => {
                    this.$.namesTwitch.classList.add('hidden');
                    this.$.namesName.classList.remove('hidden');
                },
                opacity: 1,
                ease: NAME_FADE_IN_EASE
            });
            this._nameTL.to(this.$.names, this.nameFadeDuration, {
                opacity: 0,
                ease: NAME_FADE_OUT_EASE
            }, '+=80');
        });
    }
    updateName({ alias = '?', pronouns = '', twitchAlias = '', rotate = true } = {}) {
        const doTheDangThing = () => {
            this.name = pronouns ? `${alias} (${pronouns})` : alias;
            this.twitch = twitchAlias;
            this.$.namesName.classList.add('hidden');
            this.$.namesTwitch.classList.remove('hidden');
            if (!this.twitch) {
                this._nameTL.pause();
                this.$.namesName.classList.remove('hidden');
                this.$.namesTwitch.classList.add('hidden');
                TweenLite.to(this.$.names, this.nameFadeDuration, { opacity: 1, ease: NAME_FADE_IN_EASE });
            }
            else if (rotate) {
                this._nameTL.restart();
            }
            else {
                this._nameTL.pause();
                TweenLite.to(this.$.names, this.nameFadeDuration, { opacity: 1, ease: NAME_FADE_IN_EASE });
            }
            Polymer.RenderStatus.afterNextRender(this, this.fitName);
        };
        if (window.__SCREENSHOT_TESTING__) {
            doTheDangThing();
            return;
        }
        TweenLite.to(this.$.names, this.nameFadeDuration, {
            opacity: 0,
            ease: NAME_FADE_OUT_EASE,
            callbackScope: this,
            onComplete: doTheDangThing
        });
    }
    fitName() {
        Polymer.flush();
        const MAX_NAME_WIDTH = this.$.names.clientWidth - 32;
        const MAX_TWITCH_WIDTH = MAX_NAME_WIDTH - 20;
        const twitchText = this.$.namesTwitch.querySelector('sc-fitted-text');
        this.$.namesName.maxWidth = MAX_NAME_WIDTH;
        twitchText.maxWidth = MAX_TWITCH_WIDTH;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "noLeftCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "noRightCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "left", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "right", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "noCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomNameplateElement.prototype, "noIcon", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomNameplateElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomNameplateElement.prototype, "twitch", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomNameplateElement.prototype, "nameFadeDuration", void 0);
tslib_1.__decorate([
    property({ type: Object })
], AtomNameplateElement.prototype, "_nameTL", void 0);
AtomNameplateElement = tslib_1.__decorate([
    customElement('atom-nameplate')
], AtomNameplateElement);
export default AtomNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXBELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDekMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBR3pDLElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQURqRTs7UUFHQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHbkIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUdaLFVBQUssR0FBRyxLQUFLLENBQUM7UUFHZCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBR2QsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLFNBQUksR0FBRyxFQUFFLENBQUM7UUFHVixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBRVo7Ozs7O1dBS0c7UUFFSCxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFHUCxZQUFPLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFrRnhFLENBQUM7SUFoRkEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCwrRUFBK0U7WUFDL0UsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFD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