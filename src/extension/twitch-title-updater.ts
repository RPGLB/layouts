// Packages
import * as request from 'request-promise-native';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as GDQTypes from '../types';

const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch`);
const currentRun = nodecg.Replicant<GDQTypes.Run>('currentRun');
let lastLongName: string;
let lastCategory: string;

function sendTitle(title: string, game: string) {
	request({
		method: 'put',
		uri: `https://api.twitch.tv/kraken/channels/${nodecg.bundleConfig.twitch.channelId}`,
		headers: {
			Accept: 'application/vnd.twitchtv.v5+json',
			Authorization: `OAuth ${nodecg.bundleConfig.twitch.oauthToken}`,
			'Client-ID': nodecg.bundleConfig.twitch.clientId,
			'Content-Type': 'application/json'
		},
		body: {
			channel: {
				// tslint:disable-next-line:no-invalid-template-strings
				status: title,
				game: game
			}
		},
		json: true
	}).then(() => {
		log.info('Successfully updated Twitch title and game to', game);
	}).catch(err => {
		log.error('Failed updating Twitch title and game:\n\t', err);
	});
}

currentRun.on('change', newVal => {
	if (nodecg.bundleConfig.twitch.pre) {
		sendTitle('RPG Limit Break 2019 starts 10:30 AM MDT, May 5, 2019!', 'Final Fantasy Type-0 HD');
		return;
	}

	if (newVal.longName === lastLongName && newVal.category === lastCategory) {
		return;
	}

	log.info('Updating Twitch title and game to', newVal.longName, newVal.category);
	lastLongName = newVal.longName;
	lastCategory = newVal.category;

	let title = nodecg.bundleConfig.twitch.titleTemplate.replace('${gameName}', newVal.longName);
	let cat = ''
	if (newVal.category) {
		cat = '(' + newVal.category + ')';
	}
	title = title.replace('${category}', cat);

	sendTitle(title, newVal.longName);
});
