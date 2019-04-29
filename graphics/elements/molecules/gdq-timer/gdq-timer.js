import * as tslib_1 from "tslib";
var GDQTimerElement_1;
const { customElement, property } = Polymer.decorators;
const stopwatch = nodecg.Replicant('stopwatch');
const currentRun = nodecg.Replicant('currentRun');
let GDQTimerElement = GDQTimerElement_1 = class GDQTimerElement extends Polymer.Element {
    ready() {
        super.ready();
        stopwatch.on('change', (newVal) => {
            this.hours = newVal.time.hours;
            this.minutes = newVal.time.minutes;
            this.seconds = newVal.time.seconds;
            this.milliseconds = newVal.time.milliseconds;
            this.notStarted = newVal.state === 'not_started';
            this.paused = newVal.state === 'paused';
            this.finished = newVal.state === 'finished';
        });
        currentRun.on('change', this.currentRunChanged.bind(this));
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
    }
    _lessThanEqZero(num) {
        return num <= 0;
    }
    _padTime(num) {
        return String(num).padStart(2, '0');
    }
    _formatMilliseconds(milliseconds) {
        return Math.floor(milliseconds / 100);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQTimerElement.prototype, "notStarted", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: GDQTimerElement_1.prototype.pausedChanged })
], GDQTimerElement.prototype, "paused", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: GDQTimerElement_1.prototype.finishedChanged })
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
GDQTimerElement = GDQTimerElement_1 = tslib_1.__decorate([
    customElement('gdq-timer')
], GDQTimerElement);
export default GDQTimerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFDM0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUd2RCxJQUFxQixlQUFlLHVCQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBNEIzRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRTdDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxhQUFhLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztZQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxhQUFhLENBQUMsTUFBZTtRQUM1QixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO0lBQ0YsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUFlO1FBQzlCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDcEI7SUFDRixDQUFDO0lBRUQsaUJBQWlCLENBQUMsTUFBVztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxlQUFlLENBQUMsR0FBVztRQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ25CLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELG1CQUFtQixDQUFDLFlBQW9CO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNELENBQUE7QUF2RUE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO21EQUNoQztBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxpQkFBZSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsQ0FBQzsrQ0FDdkY7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsaUJBQWUsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFDLENBQUM7aURBQ3ZGO0FBR2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzhDQUNYO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cURBQ0o7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aURBQ1I7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1Q7QUExQkksZUFBZTtJQURuQyxhQUFhLENBQUMsV0FBVyxDQUFDO0dBQ04sZUFBZSxDQXlFbkM7ZUF6RW9CLGVBQWUifQ==