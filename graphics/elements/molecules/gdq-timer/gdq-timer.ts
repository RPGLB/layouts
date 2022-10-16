import { Run } from "../../../../src/types";
import { Stopwatch } from "../../../../src/types/schemas/stopwatch";

const { customElement, property } = Polymer.decorators;

const stopwatch = nodecg.Replicant<Stopwatch>("stopwatch");
const currentRun = nodecg.Replicant<Run>("currentRun");

@customElement("gdq-timer")
export default class GDQTimerElement extends Polymer.Element {
	@property({ type: Boolean, reflectToAttribute: true })
	notStarted: boolean;

	@property({
		type: Boolean,
		reflectToAttribute: true,
		observer: GDQTimerElement.prototype.pausedChanged
	})
	paused: boolean;

	@property({
		type: Boolean,
		reflectToAttribute: true,
		observer: GDQTimerElement.prototype.finishedChanged
	})
	finished: boolean;

	@property({ type: Number })
	hours: number;

	@property({ type: Number })
	minutes: number;

	@property({ type: Number })
	seconds: number;

	@property({ type: Number })
	milliseconds: number;

	@property({ type: String })
	estimate: string;

	@property({ type: String })
	console: string;

	@property({ type: String })
	releaseYear: string;

	ready() {
		super.ready();

		stopwatch.on("change", newVal => {
			this.hours = newVal.time.hours;
			this.minutes = newVal.time.minutes;
			this.seconds = newVal.time.seconds;
			this.milliseconds = newVal.time.milliseconds;

			this.notStarted = newVal.state === "not_started";
			this.paused = newVal.state === "paused";
			this.finished = newVal.state === "finished";
		});

		currentRun.on("change", this.currentRunChanged.bind(this));
	}

	pausedChanged(newVal: boolean) {
		if (newVal && this.finished) {
			this.finished = false;
		}
	}

	finishedChanged(newVal: boolean) {
		if (newVal && this.paused) {
			this.paused = false;
		}
	}

	currentRunChanged(newVal: Run) {
		this.console = newVal.console;
		this.estimate = newVal.estimate;
		this.releaseYear =
			typeof newVal.releaseYear === "number"
				? String(newVal.releaseYear)
				: "";
	}

	_lessThanEqZero(num: number) {
		return num <= 0;
	}

	_padTime(num: number) {
		return String(num).padStart(2, "0");
	}

	_formatMilliseconds(milliseconds: number) {
		return Math.floor(milliseconds / 100);
	}
}
