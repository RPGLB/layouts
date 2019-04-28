import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarRunElement = class GDQOmnibarRunElement extends Polymer.Element {
    enter() {
        return this.$.listItem.enter();
    }
    exit() {
        return this.$.listItem.exit();
    }
    formatName(name) {
        return name.replace('\\n', ' ').trim();
    }
    concatenateRunners(run) {
        let concatenatedRunners = run.runners[0] ? run.runners[0].name : '';
        if (run.runners.length > 1) {
            concatenatedRunners = run.runners.slice(1).reduce((prev, curr, index, array) => {
                if (index === array.length - 1) {
                    return `${prev} & ${curr.name}`;
                }
                return `${prev}, ${curr.name}`;
            }, concatenatedRunners);
        }
        return concatenatedRunners;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQOmnibarRunElement.prototype, "run", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarRunElement.prototype, "first", void 0);
GDQOmnibarRunElement = tslib_1.__decorate([
    customElement('gdq-omnibar-run')
], GDQOmnibarRunElement);
export default GDQOmnibarRunElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItcnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9tbmliYXItcnVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBT2hFLEtBQUs7UUFDSixPQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBc0MsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBSTtRQUNILE9BQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFzQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFRCxVQUFVLENBQUMsSUFBWTtRQUN0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFRO1FBQzFCLElBQUksbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNwRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixtQkFBbUIsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDOUUsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNoQztnQkFFRCxPQUFPLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUN4QjtRQUNELE9BQU8sbUJBQW1CLENBQUM7SUFDNUIsQ0FBQztDQUNELENBQUE7QUE5QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aURBQ2hCO0FBR1Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO21EQUNyQztBQUxLLG9CQUFvQjtJQUR4QyxhQUFhLENBQUMsaUJBQWlCLENBQUM7R0FDWixvQkFBb0IsQ0FnQ3hDO2VBaENvQixvQkFBb0IifQ==