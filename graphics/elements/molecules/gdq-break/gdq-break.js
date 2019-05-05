import * as tslib_1 from "tslib";
import PQueue from '../../../../shared/lib/vendor/p-queue';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakElement = class GDQBreakElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._queue = new PQueue({ concurrency: 1 });
    }
    _setupInterrupt({ messageName, interruptElement }) {
        let queued = false;
        let queue = [];
        nodecg.listenFor(messageName, payload => {
            if (interruptElement.canExtend) {
                interruptElement.playItem(payload);
                return;
            }
            if (queued) {
                queue.push(payload);
            }
            else {
                queued = true;
                this._queue.add(async () => {
                    interruptElement.addEventListener('can-extend', () => {
                        queue.forEach(queuedFanart => {
                            interruptElement.playItem(queuedFanart);
                        });
                        queued = false;
                        queue = [];
                    }, { once: true, passive: true });
                    return this._promisifyTimeline(interruptElement.playItem(payload));
                }).catch(error => {
                    nodecg.log.error(error);
                });
            }
        });
    }
    async _promisifyTimeline(tl) {
        return new Promise(resolve => {
            tl.call(resolve, undefined, null, '+=0.03');
        });
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakElement.prototype, "_queue", void 0);
GDQBreakElement = tslib_1.__decorate([
    customElement('gdq-break')
], GDQBreakElement);
export default GDQBreakElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQUUzRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDVEOzs7T0FHRztJQUNIOztRQUdDLFdBQU0sR0FBVyxJQUFJLE1BQU0sQ0FBQyxFQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBb0MvQyxDQUFDO0lBbENBLGVBQWUsQ0FBQyxFQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBNkQ7UUFDMUcsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxHQUFjLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUN2QyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtnQkFDL0IsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO2FBQ1A7WUFFRCxJQUFJLE1BQU0sRUFBRTtnQkFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNOLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzFCLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7d0JBQ3BELEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7NEJBQzVCLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDekMsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsTUFBTSxHQUFHLEtBQUssQ0FBQzt3QkFDZixLQUFLLEdBQUcsRUFBRSxDQUFDO29CQUNaLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7b0JBQ2hDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixDQUFDLENBQUMsQ0FBQzthQUNIO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQThCO1FBQ3RELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBcENBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytDQUNxQjtBQUYxQixlQUFlO0lBRG5DLGFBQWEsQ0FBQyxXQUFXLENBQUM7R0FDTixlQUFlLENBc0NuQztlQXRDb0IsZUFBZSJ9