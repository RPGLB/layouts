import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentRun = nodecg.Replicant('currentRun');
const stopwatch = nodecg.Replicant('stopwatch');
const gameAudioChannels = nodecg.Replicant('mixer_gameAudioChannels');
/**
 * @customElement
 * @polymer
 */
let GDQRunnerNameplateElement = class GDQRunnerNameplateElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.noLeftCap = false;
        this.noRightCap = false;
        this.noCap = false;
        this.noIcon = false;
        this.noTwitch = false;
        this.audio = false;
        this.noAudio = false;
        this.coop = false;
        this.finished = false;
        this.forfeit = false;
        this._numRunners = 1;
    }
    ready() {
        super.ready();
        this.currentRunChanged = this.currentRunChanged.bind(this);
        this.stopwatchChanged = this.stopwatchChanged.bind(this);
        this.gameAudioChannelsChanged = this.gameAudioChannelsChanged.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            // Attach replicant change listeners.
            currentRun.on('change', this.currentRunChanged);
            stopwatch.on('change', this.stopwatchChanged);
            gameAudioChannels.on('change', this.gameAudioChannelsChanged);
        });
    }
    /*
     * 1) For singleplayer, if both match (ignoring capitalization), show only twitch.
     * 2) For races, if everyone matches (ignoring capitalization), show only twitch, otherwise,
     *    if even one person needs to show both, everyone shows both.
     */
    currentRunChanged(newVal, oldVal) {
        if (!newVal || typeof newVal !== 'object') {
            return;
        }
        this.coop = newVal.coop;
        this._numRunners = newVal.runners.length;
        // Only invoke updateNames if the names could have changed.
        if (!oldVal || JSON.stringify(newVal.runners) !== JSON.stringify(oldVal.runners)) {
            this.updateNames(newVal.runners);
        }
    }
    updateNames(runners) {
        let canConflateAllRunners = true;
        runners.forEach(r => {
            if (r && (!r.stream || r.name.toLowerCase() !== r.stream.toLowerCase())) {
                canConflateAllRunners = false;
            }
        });
        const runner = runners[this.index];
        let alias;
        let twitchAlias;
        let pronouns;
        if (runner) {
            alias = runner.name;
            pronouns = runner.pronouns;
            if (runner.stream) {
                twitchAlias = runner.stream;
            }
            else {
                twitchAlias = '';
            }
        }
        else {
            alias = '?';
            twitchAlias = '?';
        }
        this.$.nameplate.updateName({ alias, pronouns, twitchAlias: this.noTwitch ? undefined : twitchAlias, rotate: !canConflateAllRunners });
    }
    stopwatchChanged(newVal) {
        if (newVal.results[this.index]) {
            this.forfeit = newVal.results[this.index].forfeit;
            this.place = newVal.results[this.index].place;
            this.time = newVal.results[this.index].time.formatted;
            this.finished = true;
        }
        else {
            this.forfeit = false;
            this.finished = false;
        }
    }
    gameAudioChannelsChanged(newVal) {
        if (this.noAudio) {
            return;
        }
        if (!newVal || newVal.length <= 0) {
            return;
        }
        const channels = newVal[this.index];
        const canHearSd = !channels.sd.muted && !channels.sd.fadedBelowThreshold;
        const canHearHd = !channels.hd.muted && !channels.hd.fadedBelowThreshold;
        this.audio = canHearSd || canHearHd;
    }
    _computeFirstPlace(place) {
        return place === 1;
    }
    _computeLastPlace(place, numRunners) {
        return place === numRunners;
    }
    _calcResultHidden(resultSide) {
        return !resultSide;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noLeftCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noRightCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noCap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noIcon", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQRunnerNameplateElement.prototype, "noTwitch", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "audioVertPos", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "audioHorizPos", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, notify: true })
], GDQRunnerNameplateElement.prototype, "audio", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "noAudio", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "resultSide", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "finished", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "forfeit", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunnerNameplateElement.prototype, "time", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "place", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeFirstPlace(place)' })
], GDQRunnerNameplateElement.prototype, "firstPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeLastPlace(place, _numRunners)' })
], GDQRunnerNameplateElement.prototype, "lastPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "left", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRunnerNameplateElement.prototype, "right", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunnerNameplateElement.prototype, "_numRunners", void 0);
GDQRunnerNameplateElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate')
], GDQRunnerNameplateElement);
export default GDQRunnerNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVubmVyLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUMzRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXlCLHlCQUF5QixDQUFDLENBQUM7QUFFOUY7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHRFOzs7T0FHRztJQUNIOztRQUdDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUduQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBR2QsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFZakIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUdkLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFNaEIsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUdiLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQXFCaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7SUEyR2pCLENBQUM7SUF6R0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdC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