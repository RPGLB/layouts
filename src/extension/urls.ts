'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';

export interface IGDQUrls {
	readonly allBids: string;
	readonly allPrizes: string;
	readonly currentBids: string;
	readonly currentPrizes: string;
	readonly runners: string;
	readonly runs: string;
	readonly events: string;
}

const nodecg = nodecgApiContext.get();
const EVENT_ID = nodecg.bundleConfig.tracker.eventId;

const PRODUCTION_URLS: IGDQUrls = {
	allBids: trackerUrlFactory(`/search/?type=allbids&event=${EVENT_ID}`),
	allPrizes: trackerUrlFactory(`/search/?type=prize&event=${EVENT_ID}`),
	currentBids: trackerUrlFactory(`/search/?type=allbids&feed=current&event=${EVENT_ID}`),
	currentPrizes: trackerUrlFactory(`/search/?type=prize&feed=current&event=${EVENT_ID}`),
	runners: trackerUrlFactory(`/search?type=runner&event=${EVENT_ID}`),
	runs: trackerUrlFactory(`/search?type=run&event=${EVENT_ID}`),
	events: trackerUrlFactory('/search/?type=event'),
};

function trackerUrlFactory(route: string) {
	return nodecg.bundleConfig.tracker.baseUrl + route;
}

let urlsDict = PRODUCTION_URLS;

export const GDQUrls = urlsDict; // tslint:disable-line:variable-name
