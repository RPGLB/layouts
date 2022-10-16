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
        if (!availableItems) {
            return;
        }
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