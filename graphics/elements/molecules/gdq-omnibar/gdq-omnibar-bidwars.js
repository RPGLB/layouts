import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const MAX_OPTIONS = 4;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarBidwarsElement = class GDQOmnibarBidwarsElement extends Polymer.Element {
    enter(displayDuration, scrollHoldDuration) {
        const tl = new TimelineLite();
        const labelElem = this.$.label;
        this.bidWars.forEach((bidWar, bidIndex) => {
            // Show at most MAX_OPTIONS options.
            const bidElements = bidWar.options.slice(0, MAX_OPTIONS).map((option, index) => {
                const element = document.createElement('gdq-omnibar-bidwar-option');
                element.bid = option;
                element.winning = index === 0;
                return element;
            });
            if (bidElements.length <= 0) {
                const placeholder = document.createElement('gdq-omnibar-bidwar-option');
                placeholder.bid = {};
                placeholder.placeholder = true;
                bidElements.push(placeholder);
            }
            const listElement = document.createElement('gdq-omnibar-list');
            listElement.classList.add('list');
            bidElements.forEach(element => {
                listElement.appendChild(element);
            });
            this.$.lists.appendChild(listElement);
            Polymer.flush();
            bidElements.slice(0).reverse().forEach((element, index) => {
                element.render();
                element.style.zIndex = String(index); // First item has highest z-index, last item has lowest.
            });
            tl.call(() => {
                this.$.lists.select(bidIndex);
            });
            if (bidIndex === 0) {
                tl.add(labelElem.enter(bidWar.description));
            }
            else {
                tl.add(labelElem.change(bidWar.description));
            }
            tl.call(() => {
                tl.pause();
                const fooTl = listElement.enter(displayDuration, scrollHoldDuration);
                fooTl.call(tl.resume, undefined, tl);
            });
            tl.add(listElement.exit());
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.add(this.$.label.exit());
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQOmnibarBidwarsElement.prototype, "bidWars", void 0);
GDQOmnibarBidwarsElement = tslib_1.__decorate([
    customElement('gdq-omnibar-bidwars')
], GDQOmnibarBidwarsElement);
export default GDQOmnibarBidwarsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItYmlkd2Fycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWJpZHdhcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFNbEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUV0Qjs7O0dBR0c7QUFFSCxJQUFxQix3QkFBd0IsR0FBN0MsTUFBcUIsd0JBQXlCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFJcEUsS0FBSyxDQUFDLGVBQXVCLEVBQUUsa0JBQTBCO1FBQ3hELE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFzQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3pDLG9DQUFvQztZQUNwQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM5RSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFrQyxDQUFDO2dCQUNyRyxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztnQkFDckIsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixPQUFPLE9BQU8sQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sV0FBVyxHQUFHLFFBQVEs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