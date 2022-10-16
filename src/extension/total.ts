"use strict";

// Packages
import * as request from "request-promise-native";

// Ours
import WebSocket = require("ws");
import { formatDollars } from "./util";
import * as nodecgApiContext from "./util/nodecg-api-context";
import { GDQUrls } from "./urls";
import { ListenForCb } from "../types/nodecg";
import { Total } from "../types/schemas/total";

const nodecg = nodecgApiContext.get();
const autoUpdateTotal = nodecg.Replicant<boolean>("autoUpdateTotal");
const recordTrackerEnabled = nodecg.Replicant<boolean>("recordTrackerEnabled");
const total = nodecg.Replicant<Total>("total");

autoUpdateTotal.on("change", (newVal: boolean) => {
	if (newVal) {
		nodecg.log.info("Automatic updating of donation total enabled");
		manuallyUpdateTotal(true);
	} else {
		nodecg.log.warn("Automatic updating of donation total DISABLED");
	}
});

recordTrackerEnabled.on("change", (newVal: boolean) => {
	if (newVal) {
		nodecg.log.info("Milestone tracker enabled");
	} else {
		nodecg.log.warn("Milestone tracker DISABLED");
	}
});

if (nodecg.bundleConfig && nodecg.bundleConfig.donationSocketUrl) {
	const socketUrl: string = nodecg.bundleConfig.donationSocketUrl;
	let socket: WebSocket;
	let retry = 0;
	let notWarnedYet = true;

	const connectWebSocket = () => {
		nodecg.log.info(`Connecting to socket at ${socketUrl}`);

		if (!socket || socket.readyState !== WebSocket.CONNECTING) {
			socket = new WebSocket(socketUrl, { origin: socketUrl });
			socket.addEventListener("open", () => {
				nodecg.log.info("Connected to socket for donations");
				notWarnedYet = true;
				retry = 0;
			});

			socket.addEventListener("error", (err: any) => {
				retry += 1;
				nodecg.log.warn(
					"Donation socket error:",
					err.type,
					err.message,
					err.error,
					retry
				);
			});

			socket.addEventListener("close", () => {
				const delay = Math.min(Math.pow(2.0, retry), 32);
				nodecg.log.info(
					"Lost connection to socket, reconnecting in",
					delay,
					"seconds"
				);
				if (delay === 32 && notWarnedYet) {
					nodecg.log.error("Cannot connect to donation socket");
					notWarnedYet = false;
				}

				setTimeout(connectWebSocket, delay * 1000);
			});

			socket.addEventListener("message", ({ data }) => {
				nodecg.log.info(data);
				const parsedData = JSON.parse(data);
				const donation = formatDonation({
					rawAmount: parsedData.amount,
					newTotal: parsedData.new_total
				});
				nodecg.sendMessage("donation", donation);

				if (autoUpdateTotal.value) {
					total.value = {
						raw: donation.rawNewTotal,
						formatted: donation.newTotal
					};
				}
			});
		}
	};

	// Get initial data
	updateTotal().then(() => {
		connectWebSocket();
	});
} else {
	nodecg.log.warn(
		`cfg/${
			nodecg.bundleName
		}.json is missing the "donationSocketUrl" property.` +
			"\n\tThis means that we cannot receive new incoming PayPal donations from the tracker," +
			"\n\tand that donation notifications will not be displayed as a result. The total also will not update."
	);
	setInterval(updateTotal, 10 * 1000);
}

nodecg.listenFor(
	"setTotal",
	({ type, newValue }: { type: string; newValue: string }) => {
		if (type === "cash") {
			total.value = {
				raw: parseFloat(newValue),
				formatted: formatDollars(newValue, { cents: false })
			};
		} else {
			nodecg.log.error('Unexpected "type" sent to setTotal: "%s"', type);
		}
	}
);

// Dashboard can invoke manual updates
nodecg.listenFor("updateTotal", manuallyUpdateTotal);

/**
 * Handles manual "updateTotal" requests.
 * @param [silent = false] - Whether to print info to logs or not.
 * @param [cb] - The callback to invoke after the total has been updated.
 */
function manuallyUpdateTotal(silent: boolean, cb?: ListenForCb) {
	if (!silent) {
		nodecg.log.info(
			"Manual donation total update button pressed, invoking update..."
		);
	}

	updateTotal()
		.then(updated => {
			if (updated) {
				nodecg.sendMessage("total:manuallyUpdated", total.value);
				nodecg.log.info("Donation total successfully updated");
			} else {
				nodecg.log.info("Donation total unchanged, not updated");
			}

			if (cb && !cb.handled) {
				cb(null, updated);
			}
		})
		.catch(error => {
			if (cb && !cb.handled) {
				cb(error);
			}
		});
}

/**
 * Updates the "total" replicant with the latest value from the GDQ Tracker API.
 */
async function updateTotal() {
	try {
		const events = await request({
			uri: GDQUrls.events,
			json: true
		});
		const currentEvent = events.find(
			(e: any) => e.pk === nodecg.bundleConfig.tracker.eventId
		);
		if (!currentEvent) {
			return false;
		}

		const freshTotal = parseFloat(currentEvent.fields.amount || 0);
		if (freshTotal === total.value.raw) {
			return false;
		}


		total.value = {
			raw: freshTotal,
			formatted: formatDollars(freshTotal, { cents: false })
		};

		return true;
	} catch (error) {
		let msg = "Could not get donation total, unknown error";
		if (error) {
			msg = `Could not get donation total:\n${error.message}`;
		}
		nodecg.log.error(msg);
	}

	return false;
}

/**
 * Formats each donation coming in from the socket repeater, which in turn is receiving them
 * from a Postback URL on the tracker.
 * @returns A formatted donation.
 */
function formatDonation({
	rawAmount,
	newTotal
}: {
	rawAmount: string | number;
	newTotal: string | number;
}) {
	const parsedRawAmount =
		typeof rawAmount === "string" ? parseFloat(rawAmount) : rawAmount;
	const parsedRawNewTotal =
		typeof newTotal === "string" ? parseFloat(newTotal) : newTotal;

	// Format amount
	let amount = formatDollars(parsedRawAmount);

	// If a whole dollar, get rid of cents
	if (amount.endsWith(".00")) {
		amount = amount.substr(0, amount.length - 3);
	}

	return {
		amount,
		rawAmount: parsedRawAmount,
		newTotal: formatDollars(parsedRawNewTotal, { cents: false }),
		rawNewTotal: parsedRawNewTotal
	};
}
