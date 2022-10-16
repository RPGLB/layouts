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
        this.releaseYear =
            typeof newVal.releaseYear === "number"
                ? String(newVal.releaseYear)
                : "";
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