
const audioInputElement = document.querySelector('#audio-input');
const videoInputElement = document.querySelector('#video-input');
const audioOutputElement = document.querySelector('#audio-output')

const getDevices = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices);

        devices.forEach(device => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label;

            if (device.kind === 'audioinput') {
                audioInputElement.appendChild(option);
            } else if (device.kind === 'videoinput') {
                videoInputElement.appendChild(option);
            } else if (device.kind === 'audiooutput') {
                audioOutputElement.appendChild(option);
            }
        })

    } catch (error) {
        console.log('Error accessing media devices.', error)
    }
};


const changeAutioInput = async (e) => {
    const deviceId = e.target.value;
    // console.log(deviceId);
    const constraints = {
        audio: { deviceId: { exact: deviceId } },
        video: true
    };

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log("Media Stream: ", stream);
        const audioTrack = stream.getAudioTracks();
        console.log(audioTrack);
    } catch (error) {
        console.log('Error accessing media devices.', error)
    }


};

const changeVideoInput = async (e) => {
    const deviceId = e.target.value;
    const constraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
    };

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log("Media Stream: ", stream);
        const videoTrack = stream.getVideoTracks();
        console.log(videoTrack);
    } catch (error) {
        console.log('Error accessing media devices.', error)
    }
};

const changeAudioOutput = async (e) => {
    const deviceId = e.target.value;
    const videoElement = document.querySelector('#my-video');

    await videoElement.setSinkId(deviceId);
    console.log('Audio output device changed')
}


getDevices()