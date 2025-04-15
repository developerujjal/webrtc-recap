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
}


document.querySelector('#share').addEventListener('click', (e) => getMicAndCamera(e))