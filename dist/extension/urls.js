'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const EVENT_ID = nodecg.bundleConfig.tracker.eventId;
const PRODUCTION_URLS = {
    allBids: trackerUrlFactory(`/search/?type=allbids&event=${EVENT_ID}`),
    allPrizes: trackerUrlFactory(`/search/?type=prize&event=${EVENT_ID}`),
    currentBids: trackerUrlFactory(`/search/?type=allbids&feed=current&event=${EVENT_ID}`),
    currentPrizes: trackerUrlFactory(`/search/?type=prize&feed=current&event=${EVENT_ID}`),
    runners: trackerUrlFactory(`/search?type=runner&event=${EVENT_ID}`),
    runs: trackerUrlFactory(`/search?type=run&event=${EVENT_ID}`),
    events: trackerUrlFactory('/search/?type=event'),
};
function trackerUrlFactory(route) {
    return nodecg.bundleConfig.tracker.baseUrl + route;
}
let urlsDict = PRODUCTION_URLS;
exports.GDQUrls = urlsDict; // tslint:disable-line:variable-name
//# sourceMappingURL=urls.js.map