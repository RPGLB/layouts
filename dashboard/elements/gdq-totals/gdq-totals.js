import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cashTotal = nodecg.Replicant('total');
const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
let GDQTotalsElement = class GDQTotalsElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.cashTotal = '?';
    }
    ready() {
        super.ready();
        cashTotal.on('change', newVal => {
            this.cashTotal = newVal.formatted;
        });
        autoUpdateTotal.on('change', newVal => {
            this.autoUpdateTotal = newVal;
        });
    }
    editCashTotal() {
        if (!cashTotal.value) {
            return;
        }
        this.$.editTotalInput.value = String(cashTotal.value.raw);
        this._editTarget = 'cash';
        this.$.editDialog.open();
    }
    _handleAutoUpdateToggleChange(e) {
        if (!e.target) {
            return;
        }
        autoUpdateTotal.value = Boolean(e.target.checked);
    }
    _handleEditDialogConfirmed() {
        nodecg.sendMessage('setTotal', {
            type: this._editTarget,
            newValue: parseFloat(String(this.$.editTotalInput.value))
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsElement.prototype, "cashTotal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQTotalsElement.prototype, "autoUpdateTotal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQTotalsElement.prototype, "recordTrackerEnabled", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsElement.prototype, "_editTarget", void 0);
GDQTotalsElement = tslib_1.__decorate([
    customElement('gdq-totals')
], GDQTotalsElement);
export default GDQTotalsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsaUJBQWlCLENBQUMsQ0FBQztBQUdyRSxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEN0Q7O1FBR0MsY0FBUyxHQUFHLEdBQUcsQ0FBQztJQTJDakIsQ0FBQztJQWhDQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYTtRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO1lBQ3JCLE9BQU87U0FDUDtRQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBb0MsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFpQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCw2QkFBNkIsQ0FBQyxDQUFRO1FBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTztTQUNQO1FBQ0QsZUFBZSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQW1DLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELDBCQUEwQjtRQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUM5QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDdEIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFvQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hGLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBM0NBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNUO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO3lEQUNEO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDOzhEQUNJO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNMO0FBWEEsZ0JBQWdCO0lBRHBDLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDUCxnQkFBZ0IsQ0E2Q3BDO2VBN0NvQixnQkFBZ0IifQ==