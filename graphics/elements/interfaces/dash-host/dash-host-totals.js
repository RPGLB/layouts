import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cashTotal = nodecg.Replicant('total');
let DashHostTotalsElement = class DashHostTotalsElement extends Polymer.Element {
    connectedCallback() {
        super.connectedCallback();
        cashTotal.on('change', newVal => {
            this.cashTotal = newVal.formatted;
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashHostTotalsElement.prototype, "cashTotal", void 0);
DashHostTotalsElement = tslib_1.__decorate([
    customElement('dash-host-totals')
], DashHostTotalsElement);
export default DashHostTotalsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LXRvdGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBR25ELElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUlqRSxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFSQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDUDtBQUZFLHFCQUFxQjtJQUR6QyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixxQkFBcUIsQ0FVekM7ZUFWb0IscUJBQXFCIn0=