import * as tslib_1 from "tslib";
import { TimelineLite, Sine } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarBidwarOptionElement = class GDQOmnibarBidwarOptionElement extends Polymer.Element {
    ready() {
        super.ready();
    }
    enter() {
        const tl = new TimelineLite();
        tl.fromTo(this, 0.234, {
            y: 84,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            ease: Sine.easeOut
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.to(this, 0.465, {
            y: 84,
            opacity: 0,
            ease: Sine.easeIn
        });
        return tl;
    }
    render() {
    }
    formatOptionDescription(bid) {
        const fallback = 'Be the first to bid!';
        if (bid && !(bid.description || bid.name)) {
            nodecg.log.error('Got weird bid war option:', JSON.stringify(bid, null, 2));
            return fallback;
        }
        return bid ? (bid.description || bid.name) : fallback;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQOmnibarBidwarOptionElement.prototype, "bid", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarBidwarOptionElement.prototype, "placeholder", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarBidwarOptionElement.prototype, "winning", void 0);
GDQOmnibarBidwarOptionElement = tslib_1.__decorate([
    customElement('gdq-omnibar-bidwar-option')
], GDQOmnibarBidwarOptionElement);
export default GDQOmnibarBidwarOptionElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItYmlkd2FyLW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWJpZHdhci1vcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3hDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7O0dBR0c7QUFFSCxJQUFxQiw2QkFBNkIsR0FBbEQsTUFBcUIsNkJBQThCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFVekUsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDdEIsQ0FBQyxFQUFFLEVBQUU7WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNWLEVBQUU7WUFDRixDQUFDLEVBQUUsQ0FBQztZQUNKLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ2xCLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQUk7UUFDSCxNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNsQixDQUFDLEVBQUUsRUFBRTtZQUNMLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ2pCLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELE1BQU07SUFDTixDQUFDO0lBRUQsdUJBQXVCLENBQUMsR0FBYTtRQUNwQyxNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztRQUN4QyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxRQUFRLENBQUM7U0FDaEI7UUFFRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3ZELENBQUM7Q0FDRCxDQUFBO0FBbkRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzBEQUNYO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO2tFQUMvQjtBQUdyQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7OERBQ25DO0FBUkcsNkJBQTZCO0lBRGpELGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztHQUN0Qiw2QkFBNkIsQ0FxRGpEO2VBckRvQiw2QkFBNkIifQ==