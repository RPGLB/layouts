import { Prize } from "../../../../src/types/index";
import { TimelineLite } from "gsap";

const { customElement, property } = Polymer.decorators;

const LOOP_DURATION = nodecg.bundleConfig.displayDuration * 1000;

const currentPrizes = nodecg.Replicant<Prize[]>("currentPrizes");
const prizeFilterEnabledRep = nodecg.Replicant<boolean>("prizePictureFilterEnabled");

/**
 * @customElement
 * @polymer
 */
@customElement("gdq-break-prizes")
export default class GDQBreakPrizesElement extends Polymer.Element {
	@property({ type: String })
	prizeName: string;

	@property({ type: String })
	imageSrc: string;

	@property({type: String})
	minimal: string;

	prizeFilterEnabled: boolean;
	currentPrizes: Prize[]

	private loopInterval: number;

	ready() {
		super.ready();
		prizeFilterEnabledRep.on('change', newVal => {
			this.prizeFilterEnabled = newVal;
			this.handleChanges()
		})
		currentPrizes.on("change", newVal => {
			this.currentPrizes = [...newVal]
			this.handleChanges()
		});
	}

	private handleChanges() {
		if (this.prizeFilterEnabled) {
			this.startLoop(this.currentPrizes.filter(item => Boolean(item.image)));
		} else {
			this.startLoop(this.currentPrizes);
		}
	}

	private startLoop(availableItems: Prize[]) {
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

	private setItem(firstItem: Prize) {
		const opacityTargets = [this.$.infoTextWrapper, this.$.photo, this.$.minimal]
		const tl = new TimelineLite();
		tl.to(opacityTargets, 0.33, { opacity: 0 });
		tl.call(() => {
			(this.$.infoTextWrapper as HTMLDivElement).innerHTML = firstItem.name.replace(/\\n/g, '<br>')
			this.imageSrc = firstItem.image || '';
			this.minimal = firstItem.minimumbid ? `Minimum Donation: ${firstItem.minimumbid}` : '';
		});
		tl.to(opacityTargets, 0.33, { opacity: 1 });
	}
}
