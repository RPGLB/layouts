import * as tslib_1 from "tslib";
import { AbstractLocalRando } from '../../../classes/rando/abstract-local-rando';
const { customElement, property } = Polymer.decorators;
const boardsRep = nodecg.Replicant('dwrRandoBoards');
/**
 * @customElement
 * @polymer
 */
let RPGLBDWRTrackerElement = class RPGLBDWRTrackerElement extends AbstractLocalRando {
    ready() {
        super.ready();
        boardsRep.on('change', newVal => {
            this.goals = newVal[this.index];
        });
    }
};
tslib_1.__decorate([
    property({ type: Array })
], RPGLBDWRTrackerElement.prototype, "goals", void 0);
tslib_1.__decorate([
    property({ type: Number })
], RPGLBDWRTrackerElement.prototype, "index", void 0);
RPGLBDWRTrackerElement = tslib_1.__decorate([
    customElement('rpglb-dwr-tracker')
], RPGLBDWRTrackerElement);
export default RPGLBDWRTrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBnbGItZHdyLXRyYWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJycGdsYi1kd3ItdHJhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFFL0UsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWlCLGdCQUFnQixDQUFDLENBQUM7QUFFckU7OztHQUdHO0FBRUgsSUFBcUIsc0JBQXNCLEdBQTNDLE1BQXFCLHNCQUF1QixTQUFRLGtCQUF3QjtJQU8zRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFYQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztxREFDVjtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNYO0FBTE0sc0JBQXNCO0lBRDFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztHQUNkLHNCQUFzQixDQWExQztlQWJvQixzQkFBc0IifQ==