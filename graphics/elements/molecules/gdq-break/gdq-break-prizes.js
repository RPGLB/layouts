import * as tslib_1 from "tslib";
import { TimelineLite } from "gsap";
const { customElement, property } = Polymer.decorators;
const LOOP_DURATION = nodecg.bundleConfig.displayDuration * 1000;
const currentPrizes = nodecg.Replicant("currentPrizes");
const prizeFilterEnabledRep = nodecg.Replicant("prizePictureFilterEnabled");
/**
 * @customElement
 * @polymer
 */
let GDQBreakPrizesElement = class GDQBreakPrizesElement extends Polymer.Element {
    ready() {
        super.ready();
        prizeFilterEnabledRep.on('change', newVal => {
            this.prizeFilterEnabled = newVal;
            this.handleChanges();
        });
        currentPrizes.on("change", newVal => {
            this.currentPrizes = [...newVal];
            this.handleChanges();
        });
    }
    handleChanges() {
        if (this.prizeFilterEnabled) {
            this.startLoop(this.currentPrizes.filter(item => Boolean(item.image)));
        }
        else {
            this.startLoop(this.currentPrizes);
        }
    }
    startLoop(availableItems) {
        clearInterval(this.loopInterval);
        const firstItem = availableItems.shift();
        if (!firstItem) {
            return;
        }
        availableItems.push(firstItem);
        this.setItem(firstItem);
        this.loopInterval = window.setInterval(() => {
            const firstItem = availableItems.shift();
            if (!firstItem) {
                return;
            }
            availableItems.push(firstItem);
            this.setItem(firstItem);
        }, LOOP_DURATION);
    }
    setItem(firstItem) {
        const opacityTargets = [this.$.infoTextWrapper, this.$.photo, this.$.minimal];
        const tl = new TimelineLite();
        tl.to(opacityTargets, 0.33, { opacity: 0 });
        tl.call(() => {
            this.$.infoTextWrapper.innerHTML = firstItem.name.replace(/\\n/g, '<br>');
            this.imageSrc = firstItem.image || '';
            this.minimal = firstItem.minimumbid ? `Minimum Donation: ${firstItem.minimumbid}` : '';
        });
        tl.to(opacityTargets, 0.33, { opacity: 1 });
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQBreakPrizesElement.prototype, "prizeName", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQBreakPrizesElement.prototype, "imageSrc", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQBreakPrizesElement.prototype, "minimal", void 0);
GDQBreakPrizesElement = tslib_1.__decorate([
    customElement("gdq-break-prizes")
], GDQBreakPrizesElement);
export default GDQBreakPrizesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXByaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1wcml6ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXZELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztBQUVqRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLGVBQWUsQ0FBQyxDQUFDO0FBQ2pFLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwyQkFBMkIsQ0FBQyxDQUFDO0FBRXJGOzs7R0FHRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQWVqRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QscUJBQXFCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNyQixDQUFDLENBQUMsQ0FBQTtRQUNGLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTyxhQUFhO1FBQ3BCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxN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