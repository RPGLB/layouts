import {Total} from '../../../../src/types/schemas/total';

const {customElement, property} = Polymer.decorators;
const cashTotal = nodecg.Replicant<Total>('total');

@customElement('dash-host-totals')
export default class DashHostTotalsElement extends Polymer.Element {
	@property({type: String})
	cashTotal: string;

	connectedCallback() {
		super.connectedCallback();
		cashTotal.on('change', newVal => {
			this.cashTotal = newVal.formatted;
		});
	}
}
