import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const checklist = nodecg.Replicant('checklist');
let GDQChecklistElement = class GDQChecklistElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        checklist.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this.audioEngineerDuties = newVal.audioEngineerDuties;
            this.techStationDuties = newVal.techStationDuties;
            this.stageTechDuties = newVal.stageTechDuties;
            const cycleRecordingsTask = newVal.special.find(task => task.name === 'Cycle Recordings');
            if (cycleRecordingsTask) {
                this.recordingsCycled = cycleRecordingsTask.complete;
            }
        });
        this._checkboxChanged = this._checkboxChanged.bind(this);
        this.addEventListener('change', this._checkboxChanged);
    }
    _checkboxChanged(e) {
        const target = e.composedPath()[0];
        const category = target.getAttribute('category');
        const name = target.hasAttribute('name') ?
            target.getAttribute('name') :
            target.innerText.trim();
        if (!category) {
            return;
        }
        checklist.value[category].find(task => {
            if (task.name === name) {
                task.complete = Boolean(target.checked);
                return true;
            }
            return false;
        });
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQChecklistElement.prototype, "stageTechDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQChecklistElement.prototype, "audioEngineerDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQChecklistElement.prototype, "techStationDuties", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQChecklistElement.prototype, "recordingsCycled", void 0);
GDQChecklistElement = tslib_1.__decorate([
    customElement('gdq-checklist')
], GDQChecklistElement);
export default GDQChecklistElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNoZWNrbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jaGVja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBRzNELElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFhcEYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUN0RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUU5QyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzFGLElBQUksbUJBQW1CLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7YUFDckQ7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGdCQUFnQixDQUFDLENBQVE7UUFDeEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBeUIsQ0FBQztRQUMzRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2QsT0FBTztTQUNQO1FBRUMsU0FBUyxDQUFDLEtBQWEsQ0FBQyxRQUFRLENBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xFLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxJQUFJLENBQUM7YUFDWjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQW5EQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs0REFDUTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztnRUFDWTtBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs4REFDVTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQzs2REFDQTtBQVhOLG1CQUFtQjtJQUR2QyxhQUFhLENBQUMsZUFBZSxDQUFDO0dBQ1YsbUJBQW1CLENBcUR2QztlQXJEb0IsbUJBQW1CIn0=