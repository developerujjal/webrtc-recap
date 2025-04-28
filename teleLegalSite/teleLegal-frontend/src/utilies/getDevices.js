
const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
    const audioDevices = devices.filter((device) => device.kind === 'audioinput');
    const audioOutputDevices = devices.filter((device) => device.kind === 'audiooutput');

    return {
        videoDevices: videoDevices,
        audioDevices: audioDevices,
        audioOutputDevices: audioOutputDevices,
    };
};

export default getDevices;