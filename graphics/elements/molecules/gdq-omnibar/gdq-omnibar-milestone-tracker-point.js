import * as tslib_1 from "tslib";
var GDQOmnibarMilestoneTrackerPointElement_1;
const { customElement, property } = Polymer.decorators;
const ONE_THOUSAND = 1000;
let GDQOmnibarMilestoneTrackerPointElement = GDQOmnibarMilestoneTrackerPointElement_1 = class GDQOmnibarMilestoneTrackerPointElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.align = 'left';
        this.dropTrailingZeroes = false;
    }
    _alignChanged(newVal) {
        const bodyElem = this.$.body;
        if (newVal !== 'center') {
            bodyElem.style.left = '';
        }
        const bodyRect = this.$.body.getBoundingClientRect();
        bodyElem.style.left = `${(bodyRect.width / -2) + 1.5}px`;
    }
    _calcDisplayAmount(amount) {
        return `$${this._formatAmount(amount / ONE_THOUSAND)}K`;
    }
    _formatAmount(amount) {
        let amountString = String(amount).substr(0, 4);
        if (amountString.endsWith('.')) {
            return amountString.slice(0, -1);
        }
        if (this.dropTrailingZeroes) {
            while ((amountString.endsWith('0') || amountString.endsWith('.')) &&
                amountString.length > 1) {
                amountString = amountString.slice(0, -1);
            }
        }
        return amountString;
    }
};
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, observer: GDQOmnibarMilestoneTrackerPointElement_1.prototype._alignChanged })
], GDQOmnibarMilestoneTrackerPointElement.prototype, "align", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQOmnibarMilestoneTrackerPointElement.prototype, "amount", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQOmnibarMilestoneTrackerPointElement.prototype, "dropTrailingZeroes", void 0);
GDQOmnibarMilestoneTrackerPointElement = GDQOmnibarMilestoneTrackerPointElement_1 = tslib_1.__decorate([
    customElement('gdq-omnibar-milestone-tracker-point')
], GDQOmnibarMilestoneTrackerPointElement);
export default GDQOmnibarMilestoneTrackerPointElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbWlsZXN0b25lLXRyYWNrZXItcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1taWxlc3RvbmUtdHJhY2tlci1wb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7QUFJMUIsSUFBcUIsc0NBQXNDLDhDQUEzRCxNQUFxQixzQ0FBdUMsU0FBUSxPQUFPLENBQUMsT0FBTztJQURuRjs7UUFHQyxVQUFLLEdBQWMsTUFBTSxDQUFDO1FBTTFCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQWtDNUIsQ0FBQztJQWhDQSxhQUFhLENBQUMsTUFBaUI7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFzQixDQUFDO1FBQy9DLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JELFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDMUQsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWM7UUFDaEMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7SUFDekQsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFjO1FBQzNCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQixPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDaEM7UUFFRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUM1QixPQUNDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRCxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDckI7Z0JBQ0YsWUFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekM7U0FDRDtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3JCLENBQUM7Q0FDRCxDQUFBO0FBeENBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHdDQUFzQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsQ0FBQztxRUFDbkc7QUFHMUI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7c0VBQ1Y7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztrRkFDQztBQVJQLHNDQUFzQztJQUQxRCxhQUFhLENBQUMscUNBQXFDLENBQUM7R0FDaEMsc0NBQXNDLENBMEMxRDtlQTFDb0Isc0NBQXNDIn0=