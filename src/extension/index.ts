'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';

module.exports = (nodecg: any) => {
	// Store a reference to this nodecg API context in a place where other libs can easily access it.
	// This must be done before any other files are `require`d.
	nodecgApiContext.set(nodecg);
	init().then(() => {
		nodecg.log.info('Initialization successful.');
	}).catch(error => {
		nodecg.log.error('Failed to initialize:', error);
	});
};

async function init() {
	const nodecg = nodecgApiContext.get();

	if (nodecg.bundleConfig.useMockData) {
		nodecg.log.warn('WARNING! useMockData is true, you will not receive real data from the tracker!');
	}

	// Fix zeit pkg being dumb.
	require('obs-websocket-js'); // tslint:disable-line:no-implicit-dependencies

	// Be careful when re-ordering these.
	// Some of them depend on Replicants initialized in others.
	require('./timekeeping');
	require('./obs');
	require('./nowplaying');
	require('./countdown');
	require('./sortable-list');
	require('./caspar');
	require('./setup-timer');
	require('./schedule');
	require('./bids');
	require('./prizes');
	require('./total');

	if (nodecg.bundleConfig.twitch) {
		require('./twitch-ads');

		// If the appropriate config params are present,
		// automatically update the Twitch game and title when currentRun changes.
		if (nodecg.bundleConfig.twitch.titleTemplate) {
			nodecg.log.info('Automatic Twitch stream title updating enabled.');
			require('./twitch-title-updater');
		}
	}

	if (nodecg.bundleConfig.twitter) {
		if (nodecg.bundleConfig.twitter.enabled) {
			require('./twitter');
		}
	} else {
		nodecg.log.warn('"twitter" is not defined in cfg/rpglb19-layouts.json! ' +
			'Twitter integration will be disabled.');
	}

	if (nodecg.bundleConfig.mixer && nodecg.bundleConfig.mixer.address) {
		require('./mixer');
	} else {
		nodecg.log.warn('"mixer" is not defined in cfg/rpglb19-layouts.json! ' +
			'Behringer X32 OSC integration will be disabled.');
	}

	if (nodecg.bundleConfig.firebase && Object.keys(nodecg.bundleConfig.firebase).length > 0) {
		require('./interview');
	} else {
		nodecg.log.warn('"firebase" is not defined in cfg/rpglb19-layouts.json! ' +
			'The interview question system (Lightning Round) will be disabled.');
	}
}