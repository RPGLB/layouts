import {ParentBid} from '../../../../src/types/index';
import {TimelineLite, Power2} from 'gsap'

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bid-binary')
export default class GDQBreakBidBinaryElement extends Polymer.Element {
	@property({type: Object})
	bid: ParentBid;

	@property({type: String})
	optionOneText: string
	@property({type: String})
	optionTwoText: string

	ready() {
		super.ready()

		const optionOneBar = this.$.optionOneBar as HTMLDivElement
		const optionTwoBar = this.$.optionTwoBar as HTMLDivElement

		const total = this.bid.rawTotal
		const [optionOne, optionTwo] = this.bid.options

		this.optionOneText = `${optionOne.name} - ${optionOne.total}`
		this.optionTwoText = `${optionTwo.name} - ${optionTwo.total}`

		const optionOneBarPercent = optionOne.rawTotal / total * 100
		const optionTwoBarPercent = 100 - optionOneBarPercent;

		const tl = new TimelineLite()
		tl.addLabel('start', 0.3)
		tl.to(
			optionOneBar,
			0.5,
			{width: `${optionOneBarPercent}%`, ease: Power2.easeOut},
			'start'
		)
		tl.to(
			optionTwoBar,
			0.5,
			{width: `${optionTwoBarPercent}%`, ease: Power2.easeOut},
			'start'
		)
	}
}
