"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const request = require("request-promise-native");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch`);
const currentRun = nodecg.Replicant('currentRun');
let lastLongName;
let lastCategory;
function sendTitle(title, game) {
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
    let cat = '';
    if (newVal.category) {
        cat = '(' + newVal.category + ')';
    }
    title = title.replace('${category}', cat);
    let game = newVal.longName;
    const realGame = [
        { "pk": 231, "name": ".hack//INFECTION - Part 1" },
        { "pk": 232, "name": "Fire Emblem: Fuuin no Tsurugi" },
        { "pk": 238, "name": "Star Ocean: The Last Hope" },
        { "pk": 245, "name": "Quest for Glory I: So You Want To Be A Hero" },
        { "pk": 248, "name": "Dragon Warrior" },
        { "pk": 253, "name": "Hoshi wo Miru Hito" },
        { "pk": 257, "name": "The World Ends With You" },
        { "pk": 260, "name": "Final Fantasy" },
        { "pk": 265, "name": "Phantasy Star IV: The End of the Millennium" },
        { "pk": 268, "name": "Final Fantasy IV" },
        { "pk": 273, "name": "Kingdom Hearts HD 1.5 ReMIX" },
        { "pk": 274, "name": "Pokemon: Let's Go, Pikachu!/Eevee!" }
    ];
    realGame.forEach(real => {
        if (newVal.pk !== real.pk) {
            return;
        }
        game = real.name;
    });
    sendTitle(title, game);
});
//# sourceMappingURL=twitch-title-updater.js.map