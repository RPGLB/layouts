import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const MILESTONES = [
    { name: 'RPGLB 2015', total: 46595 },
    { name: 'RPGLB 2016', total: 75194.33 },
    { name: 'RPGLB 2017', total: 111773.56 },
    { name: 'RPGLB 2018', total: 164099.31 }
].sort((a, b) => {
    return a.total - b.total;
}).map((milestone, index, array) => {
    const precedingMilestone = index > 0 ?
        array[index - 1] :
        { name: 'none', total: 25000 };
    const succeedingMilestone = array[index + 1];
    const modifiedMilestone = Object.assign({}, milestone, { precedingMilestone,
        succeedingMilestone });
    Object.freeze(modifiedMilestone);
    return modifiedMilestone;
});
Object.freeze(MILESTONES);
// Configuration consts.
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const SCROLL_HOLD_DURATION = nodecg.bundleConfig.omnibar.scrollHoldDuration;
// Replicants.
const currentBids = nodecg.Replicant('currentBids');
const currentLayout = nodecg.Replicant('currentLayout');
const currentPrizes = nodecg.Replicant('currentPrizes');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
const schedule = nodecg.Replicant('schedule');
const total = nodecg.Replicant('total');
let GDQOmnibarElement = class GDQOmnibarElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.milestones = MILESTONES;
        this.noAutoLoop = false;
        this.skipLabelAnims = false;
    }
    ready() {
        super.ready();
        const replicants = [
            currentBids,
            currentLayout,
            currentPrizes,
            currentRun,
            nextRun,
            recordTrackerEnabled,
            schedule,
            total
        ];
        let numDeclared = 0;
        replicants.forEach(replicant => {
            replicant.once('change', () => {
                numDeclared++;
                // Start the loop once all replicants are declared;
                if (numDeclared >= replicants.length) {
                    Polymer.RenderStatus.beforeNextRender(this, () => {
                        setTimeout(() => {
                            this.run();
                        }, 500);
                    });
                }
            });
        });
    }
    run() {
        const self = this; // tslint:disable-line:no-this-assignment
        if (this.noAutoLoop) {
            return;
        }
        // For development, comment out whichever parts you don't want to see right now.
        const parts = [
            this.showCTA,
            this.showUpNext,
            this.showChallenges,
            this.showChoices,
            this.showCurrentPrizes,
        ];
        function processNextPart() {
            if (parts.length > 0) {
                const part = parts.shift().bind(self);
                promisifyTimeline(part())
                    .then(processNextPart)
                    .catch(error => {
                    nodecg.log.error('Error when running main loop:', error);
                });
            }
            else {
                self.run();
            }
        }
        async function promisifyTimeline(tl) {
            return new Promise(resolve => {
                tl.call(resolve, undefined, null, '+=0.03');
            });
        }
        processNextPart();
    }
    /**
     * Creates an animation timeline for showing the label.
     * @param text - The text to show.
     * @param options - Options for this animation.
     * @returns An animation timeline.
     */
    showLabel(text) {
        const tl = new TimelineLite();
        const labelElem = this.$.label;
        if (labelElem._showing) {
            tl.add(labelElem.change(text));
        }
        else {
            tl.add(labelElem.show(text));
        }
        if (this.skipLabelAnims) {
            tl.progress(1);
            return new TimelineLite();
        }
        return tl;
    }
    /**
     * Creates an animation timeline for hiding the label.
     * @returns An animation timeline.
     */
    hideLabel() {
        const hideAnim = this.$.label.hide();
        if (this.skipLabelAnims) {
            hideAnim.progress(1);
            return new TimelineLite();
        }
        return hideAnim;
    }
    setContent(tl, element) {
        tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
        tl.call(() => {
            tl.pause();
            this.$.content.innerHTML = '';
            this.$.content.appendChild(element);
            Polymer.flush(); // Might not be necessary, but better safe than sorry.
            Polymer.RenderStatus.afterNextRender(this, () => {
                Polymer.flush(); // Might not be necessary, but better safe than sorry.
                requestAnimationFrame(() => {
                    tl.resume(null, false);
                });
            });
        });
    }
    showContent(tl, element) {
        tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
        tl.call(() => {
            tl.pause();
            const elementEntranceAnim = element.enter(DISPLAY_DURATION, SCROLL_HOLD_DURATION);
            elementEntranceAnim.call(tl.resume, null, tl);
        });
    }
    hideContent(tl, element) {
        tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
        tl.call(() => {
            tl.pause();
            const elementExitAnim = element.exit();
            elementExitAnim.call(tl.resume, null, tl);
        });
    }
    showCTA() {
        const tl = new TimelineLite();
        tl.add(this.hideLabel());
        tl.call(() => {
            this.$.content.innerHTML = '';
        });
        tl.add(this.$.cta.show(DISPLAY_DURATION));
        return tl;
    }
    showUpNext() {
        const tl = new TimelineLite();
        let upNextRun = nextRun.value;
        if (currentLayout.value === 'break' || currentLayout.value === 'interview') {
            upNextRun = currentRun.value;
        }
        // If we're at the final run, bail out and just skip straight to showing the next item in the rotation.
        if (!upNextRun || !schedule.value) {
            return tl;
        }
        const upcomingRuns = [upNextRun];
        // Use the nextRun replicant instead of just pulling the next run from the schedule replicant.
        // This ensures that any local edits will be shown.
        if (upNextRun === currentRun.value) {
            upcomingRuns.push(nextRun.value);
        }
        schedule.value.some(item => {
            if (item.type !== 'run') {
                return false;
            }
            if (item.order <= upcomingRuns[upcomingRuns.length - 1].order) {
                return false;
            }
            upcomingRuns.push(item);
            return upcomingRuns.length >= 4;
        });
        const listElement = document.createElement('gdq-omnibar-list');
        upcomingRuns.forEach((run, index) => {
            const element = document.createElement('gdq-omnibar-run');
            element.run = run;
            if (index === 0) {
                element.first = true;
            }
            listElement.appendChild(element);
        });
        this.setContent(tl, listElement);
        tl.add(this.showLabel('Up Next'), '+=0.03');
        this.showContent(tl, listElement);
        this.hideContent(tl, listElement);
        return tl;
    }
    showChallenges(overrideBids, { showClosed = false } = {}) {
        const bids = overrideBids || currentBids.value;
        const tl = new TimelineLite();
        // If there's no bids whatsoever, bail out.
        if (!bids || bids.length <= 0) {
            return tl;
        }
        // Figure out what bids to display in this batch
        const bidsToDisplay = [];
        bids.forEach(bid => {
            // Don't show closed bids in the automatic rotation.
            if (!showClosed && bid.state.toLowerCase() === 'closed') {
                return;
            }
            // Only show challenges.
            if (bid.type !== 'challenge') {
                return;
            }
            // If we have already have our three bids determined, we still need to check
            // if any of the remaining bids are for the same speedrun as the third bid.
            // This ensures that we are never displaying a partial list of bids for a given speedrun.
            if (bidsToDisplay.length < 3) {
                bidsToDisplay.push(bid);
            }
            else if (bid.speedrun === bidsToDisplay[bidsToDisplay.length - 1].speedrun) {
                bidsToDisplay.push(bid);
            }
        });
        // If there's no challenges to display, bail out.
        if (bidsToDisplay.length <= 0) {
            return tl;
        }
        const containerElement = document.createElement('gdq-omnibar-challenges');
        containerElement.challenges = bidsToDisplay;
        this.setContent(tl, containerElement);
        tl.add(this.showLabel('Challenges'), '+=0.03');
        this.showContent(tl, containerElement);
        this.hideContent(tl, containerElement);
        return tl;
    }
    showChoices(overrideBids, { showClosed = false } = {}) {
        const bids = overrideBids || currentBids.value;
        const tl = new TimelineLite();
        // If there's no bids whatsoever, bail out.
        if (bids.length <= 0) {
            return tl;
        }
        // Figure out what bids to display in this batch
        const bidsToDisplay = [];
        bids.forEach(bid => {
            // Don't show closed bids in the automatic rotation.
            if (!showClosed && bid.state.toLowerCase() === 'closed') {
                return;
            }
            // Only show choices.
            if (bid.type !== 'choice-binary' && bid.type !== 'choice-many') {
                return;
            }
            // If we have already have our three bids determined, we still need to check
            // if any of the remaining bids are for the same speedrun as the third bid.
            // This ensures that we are never displaying a partial list of bids for a given speedrun.
            if (bidsToDisplay.length < 3) {
                bidsToDisplay.push(bid);
            }
            else if (bid.speedrun === bidsToDisplay[bidsToDisplay.length - 1].speedrun) {
                bidsToDisplay.push(bid);
            }
        });
        // If there's no choices to display, bail out.
        if (bidsToDisplay.length <= 0) {
            return tl;
        }
        const containerElement = document.createElement('gdq-omnibar-bidwars');
        containerElement.bidWars = bidsToDisplay;
        this.setContent(tl, containerElement);
        tl.add(this.showLabel('Bid Wars'), '+=0.03');
        this.showContent(tl, containerElement);
        this.hideContent(tl, containerElement);
        return tl;
    }
    showCurrentPrizes(overridePrizes) {
        const prizes = overridePrizes || currentPrizes.value;
        const tl = new TimelineLite();
        // No prizes to show? Bail out.
        if (prizes.length <= 0) {
            return tl;
        }
        const specialPrizesToDisplayLast = [];
        const prizesToDisplay = prizes.filter(prize => {
            if (prize.id === 1892) {
                specialPrizesToDisplayLast.push(prize);
                return false;
            }
            return true;
        }).concat(specialPrizesToDisplayLast);
        const listElement = document.createElement('gdq-omnibar-list');
        prizesToDisplay.forEach(prize => {
            const element = document.createElement('gdq-omnibar-prize');
            element.prize = prize;
            listElement.appendChild(element);
        });
        this.setContent(tl, listElement);
        tl.add(this.showLabel('Prizes'), '+=0.03');
        this.showContent(tl, listElement);
        this.hideContent(tl, listElement);
        return tl;
    }
    showMilestoneProgress() {
        const tl = new TimelineLite();
        // If we have manually disabled this feature, return.
        if (!recordTrackerEnabled.value || !total.value) {
            return tl;
        }
        // If the current total is < $25K, return.
        if (total.value.raw < 25000) {
            return tl;
        }
        const currentMilestone = MILESTONES.find(milestone => {
            return total.value.raw < milestone.total;
        });
        // If we are out of milestones to show, return.
        if (!currentMilestone) {
            return tl;
        }
        const milestoneTrackerElement = document.createElement('gdq-omnibar-milestone-tracker');
        milestoneTrackerElement.milestone = currentMilestone;
        milestoneTrackerElement.currentTotal = total.value.raw;
        this.setContent(tl, milestoneTrackerElement);
        tl.add(this.showLabel('Milestone Progress'), '+=0.03');
        this.showContent(tl, milestoneTrackerElement);
        this.hideContent(tl, milestoneTrackerElement);
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQOmnibarElement.prototype, "milestones", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarElement.prototype, "noAutoLoop", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarElement.prototype, "skipLabelAnims", void 0);
GDQOmnibarElement = tslib_1.__decorate([
    customElement('gdq-omnibar')
], GDQOmnibarElement);
export default GDQOmnibarElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQWNsQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxVQUFVLEdBQUc7SUFDbEIsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUM7SUFDbEMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUM7SUFDckMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7Q0FDdEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ2xDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDO0lBRTlCLE1BQU0sbUJBQW1CLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxNQUFNLGlCQUFpQixxQkFDbkIsU0FBUyxJQUNaLGtCQUFrQjtRQUNsQixtQkFBbUIsR0FDbkIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxNQUFNLENB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