const shareScreen = async (e) => {
    const displayMediaOptions = {
        video: {
            displaySurface: "browser",
        },
        audio: {
            suppressLocalAudioPlayback: false,
        },
        preferCurrentTab: false,
        selfBrowserSurface: "exclude",
        systemAudio: "include",
        surfaceSwitching: "include",
        monitorTypeSurfaces: "include",
    };
    let mediaStream;

    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        const videoElement = document.querySelector('#other-video');
        videoElement.srcObject = mediaStream

    } catch (error) {
        console.error("Error sharing screen: ", error);

    }

    return mediaStream;
}