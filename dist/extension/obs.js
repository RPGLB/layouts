'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const nodecg_utility_obs_1 = require("nodecg-utility-obs");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
// We track what _layout_ is active, not necessarily what _scene_ is active.
// A given layout can be on multiple scenes.
const currentLayout = nodecg.Replicant('currentLayout');
const cyclingRecordingsRep = nodecg.Replicant('obs_cyclingRecordings', { persistent: false });
exports.compositingOBS = new nodecg_utility_obs_1.OBSUtility(nodecg, { namespace: 'compositingOBS' });
exports.compositingOBS.replicants.programScene.on('change', (newVal) => {
    if (!newVal) {
        return;
    }
    newVal.sources.some(source => {
        if (!source.name) {
            return false;
        }
        const lowercaseSourceName = source.name.toLowerCase();
        if (lowercaseSourceName.indexOf('layout') === 0) {
            currentLayout.value = lowercaseSourceName.replace(/ /g, '_').replace('layout_', '');
            return true;
        }
        return false;
    });
});
// This should probably be in nodecg-utility-obs.
// For now, leaving it here.
// Come back and refactor this eventually.
[exports.compositingOBS].forEach(obs => {
    const replicant = nodecg.Replicant(`${obs.namespace}:streamStatus`, { persistent: false });
    obs.on('StreamStatus', data => {
        replicant.value = {
            'bytes-per-sec': data['bytes-per-sec'],
            'encode-skipped': data['encode-skipped'],
            'encode-total': data['encode-total'],
            fps: data.fps,
            'kbits-per-sec': data['kbits-per-sec'],
            'num-dropped-frames': data['num-dropped-frames'],
            'num-total-frames': data['num-total-frames'],
            recording: data.recording,
            'render-skipped': data['render-skipped'],
            'render-total': data['render-total'],
            strain: data.strain,
            'stream-timecode': data['stream-timecode'],
            streaming: data.streaming,
            'total-stream-time': data['total-stream-time']
        };
    });
});
async function cycleRecording(obs) {
    return new Promise((resolve, reject) => {
        let rejected = false;
        const timeout = setTimeout(() => {
            rejected = true;
            reject(new Error(`Timed out waiting for ${obs.namespace} to stop recording.`));
        }, 30000);
        const recordingStoppedListener = () => {
            if (rejected) {
                return;
            }
            obs.log.info('Recording stopped.');
            clearTimeout(timeout);
            setTimeout(() => {
                resolve();
            }, 2500);
        };
        obs.once('RecordingStopped', recordingStoppedListener);
        obs.send('StopRecording').catch(error => {
            if (error.error === 'recording not active') {
                obs.removeListener('RecordingStopped', recordingStoppedListener);
                resolve();
            }
            else {
                obs.log.error(error);
                reject(error);
            }
        });
    }).then(async () => {
        return obs.send('StartRecording');
    });
}
async function resetCropping() {
    return exports.compositingOBS.send('ResetCropping').catch((error) => {
        nodecg.log.error('resetCropping error:', error);
    });
}
exports.resetCropping = resetCropping;
async function setCurrentScene(sceneName) {
    return exports.compositingOBS.send('SetCurrentScene', {
        'scene-name': sceneName
    });
}
exports.setCurrentScene = setCurrentScene;
async function cycleRecordings() {
    nodecg.log.info('Cycling recordings...');
    cyclingRecordingsRep.value = true;
    try {
        const cycleRecordingPromises = [];
        if (exports.compositingOBS._connected) {
            cycleRecordingPromises.push(cycleRecording(exports.compositingOBS));
        }
        else {
            nodecg.log.error('Compositing OBS is disconnected! Not cycling its recording.');
        }
        if (cycleRecordingPromises.length <= 0) {
            nodecg.log.warn('No instances of OBS are connected, aborting cycleRecordings.');
            return;
        }
        await Promise.all(cycleRecordingPromises);
        nodecg.log.info('Recordings successfully cycled.');
        cyclingRecordingsRep.value = false;
        nodecg.sendMessage('obs:recordingsCycled');
    }
    catch (error) {
        cyclingRecordingsRep.value = false;
        nodecg.sendMessage('obs:recordingsCycled', error);
        throw error;
    }
}
exports.cycleRecordings = cycleRecordings;
function compositingOBSConnected() {
    return exports.compositingOBS._connected;
}
exports.compositingOBSConnected = compositingOBSConnected;
//# sourceMappingURL=obs.js.map