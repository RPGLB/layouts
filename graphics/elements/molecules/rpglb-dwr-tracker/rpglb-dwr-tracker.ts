import {DwrRandoBoards, Goal} from '../../../../src/types/schemas/dwrRandoBoards';
import {AbstractLocalRando} from '../../../classes/rando/abstract-local-rando';

const {customElement, property} = Polymer.decorators;
const boardsRep = nodecg.Replicant<DwrRandoBoards>('dwrRandoBoards');

/**
 * @customElement
 * @polymer
 */
@customElement('rpglb-dwr-tracker')
export default class RPGLBDWRTrackerElement extends AbstractLocalRando<Goal> {
	@property({type: Array})
	goals: Goal[];

	@property({type: Number})
	index: number;

	ready() {
		super.ready();
		boardsRep.on('change', newVal => {
			this.goals = newVal[this.index];
		});
	}
}
