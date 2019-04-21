import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentRun = nodecg.Replicant('currentRun');
let GDQRuninfoElement = class GDQRuninfoElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.maxNameSize = 45;
        this.forceSingleLineName = false;
        this.name = '?';
        this.initialized = false;
    }
    ready() {
        super.ready();
        Polymer.RenderStatus.afterNextRender(this, () => {
            currentRun.on('change', this.currentRunChanged.bind(this));
        });
    }
    currentRunChanged(newVal) {
        this.name = newVal.name;
        this.category = newVal.category;
        this.console = newVal.console;
        this.releaseYear = String(newVal.releaseYear) || '20XX';
        this.estimate = newVal.estimate;
        // Avoids some issues that can arise on the first time that fitText is run.
        // Currently unsure why these issues happen.
        if (this.initialized) {
            this.fitText();
        }
        else {
            Polymer.RenderStatus.afterNextRender(this, this.fitText);
            this.initialized = true;
        }
    }
    fitText() {
        Polymer.flush();
        window.textFit(this.$.name, { maxFontSize: this.maxNameSize });
        this.$.misc.maxTextWidth = (this.clientWidth - 124) / 3;
    }
    _processName(name) {
        if (!name) {
            return '&nbsp;';
        }
        if (this.forceSingleLineName) {
            return `<div class="name-line">${name.replace('\\n', ' ')}</div>`;
        }
        return name.split('\\n')
            .map((lineText, index) => {
            const tag = index === 0 ? 'div' : 'small';
            return `<${tag} class="name-line">${lineText}</${tag}>`;
        })
            .join('\n');
    }
};
tslib_1.__decorate([
    property({ type: Number })
], GDQRuninfoElement.prototype, "maxNameSize", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQRuninfoElement.prototype, "forceSingleLineName", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRuninfoElement.prototype, "estimate", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRuninfoElement.prototype, "releaseYear", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRuninfoElement.prototype, "console", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRuninfoElement.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRuninfoElement.prototype, "name", void 0);
GDQRuninfoElement = tslib_1.__decorate([
    customElement('gdq-runinfo')
], GDQRuninfoElement);
export default GDQRuninfoElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVuaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFHdkQsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBRDlEOztRQUdDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQWU1QixTQUFJLEdBQUcsR0FBRyxDQUFDO1FBRUgsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFnRDdCLENBQUM7SUE5Q0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDL0MsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGlCQUFpQixDQUFDLE1BQVc7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFaEMsMkVBQTJFO1FBQzNFLDRDQUE0QztRQUM1QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNOLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDRixDQUFDO0lBRUQsT0FBTztRQUNOLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUE4QixDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBYTtRQUN6QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsT0FBTyxRQUFRLENBQUM7U0FDaEI7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM3QixPQUFPLDBCQUEwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDO1NBQ2xFO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUN0QixHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFDMUMsT0FBTyxJQUFJLEdBQUcsc0JBQXNCLFFBQVEsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUN6RCxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZCxDQUFDO0NBQ0QsQ0FBQTtBQXBFQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztzREFDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7OERBQ3hCO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNSO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3NEQUNMO0FBR3BCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tEQUNUO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNSO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytDQUNkO0FBcEJTLGlCQUFpQjtJQURyQyxhQUFhLENBQUMsYUFBYSxDQUFDO0dBQ1IsaUJBQWlCLENBc0VyQztlQXRFb0IsaUJBQWlCIn0=