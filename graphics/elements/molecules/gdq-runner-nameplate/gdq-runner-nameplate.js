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
        if (runner) {
            alias = runner.name;
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
        this.$.nameplate.updateName({ alias, twitchAlias, rotate: !canConflateAllRunners });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVubmVyLW5hbWVwbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUMzRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXlCLHlCQUF5QixDQUFDLENBQUM7QUFFOUY7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHRFOzs7T0FHRztJQUNIOztRQUdDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVluQixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBR2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQU1oQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBR2IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBcUJoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztJQXlHakIsQ0FBQztJQXZHQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0Is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