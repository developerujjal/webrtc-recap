let stream = null;

const constraints = {
    audio: true,
    video: true
}

const getMicAndCamera = async (e) => {
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        // const videoElement = document.querySelector('video');
        // videoElement.srcObject = stream;
        // videoElement.play();    
        console.log("Media Stream: ", stream)
        
    } catch (error) {
        console.log('Error accessing media devices.', error)
    }
};


const showMyFeed = (e) => {
    const videoElement = document.querySelector('#my-video');
    videoElement.srcObject = stream;

   const tracks = stream.getTracks();
   console.log(tracks)
};


const stopMyFeed = (e) => {
    stream.getTracks().forEach((track) => {
        console.log(track)
        track.stop(); // disaccociate the track from the source or stream
    });
}


document.querySelector('#share').addEventListener('click', (e) => getMicAndCamera(e));
document.querySelector('#show-video').addEventListener('click', e => showMyFeed(e));
document.querySelector('#stop-video').addEventListener('click', (e) => stopMyFeed(e));
document.querySelector('#change-size').addEventListener('click', e => changeVideoSize(e));
document.querySelector('#start-record').addEventListener('click', e => startRecording(e));
document.querySelector('#stop-record').addEventListener('click', e => stopRecording(e));
document.querySelector('#play-record').addEventListener('click', e => playRecording(e));
document.querySelector('#share-screen').addEventListener('click', e => shareScreen(e));
