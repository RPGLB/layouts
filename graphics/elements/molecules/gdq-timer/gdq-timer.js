import * as tslib_1 from "tslib";
var GDQTimerElement_1;
const { customElement, property } = Polymer.decorators;
const stopwatch = nodecg.Replicant("stopwatch");
const currentRun = nodecg.Replicant("currentRun");
let GDQTimerElement = GDQTimerElement_1 = class GDQTimerElement extends Polymer.Element {
    ready() {
        super.ready();
        stopwatch.on("change", newVal => {
            this.hours = newVal.time.hours;
            this.minutes = newVal.time.minutes;
            this.seconds = newVal.time.seconds;
            this.milliseconds = newVal.time.milliseconds;
            this.notStarted = newVal.state === "not_started";
            this.paused = newVal.state === "paused";
            this.finished = newVal.state === "finished";
        });
        currentRun.on("change", this.currentRunChanged.bind(this));
    }
    pausedChanged(newVal) {
        if (newVal && this.finished) {
            this.finished = false;
        }
    }
    finishedChanged(newVal) {
        if (newVal && this.paused) {
            this.paused = false;
        }
    }
    currentRunChanged(newVal) {
        this.console = newVal.console;
        this.estimate = newVal.estimate;
        this.releaseYear = String(newVal.releaseYear);
    }
    _lessThanEqZero(num) {
        return num <= 0;
    }
    _padTime(num) {
        return String(num).padStart(2, "0");
    }
    _formatMilliseconds(milliseconds) {
        return Math.floor(milliseconds / 100);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQTimerElement.prototype, "notStarted", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true,
        observer: GDQTimerElement_1.prototype.pausedChanged
    })
], GDQTimerElement.prototype, "paused", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true,
        observer: GDQTimerElement_1.prototype.finishedChanged
    })
], GDQTimerElement.prototype, "finished", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "hours", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "minutes", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "seconds", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "milliseconds", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTimerElement.prototype, "estimate", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTimerElement.prototype, "console", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTimerElement.prototype, "releaseYear", void 0);
GDQTimerElement = GDQTimerElement_1 = tslib_1.__decorate([
    customElement("gdq-timer")
], GDQTimerElement);
export default GDQTimerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXZELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFDM0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUd2RCxJQUFxQixlQUFlLHVCQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBdUMzRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUU3QyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENB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