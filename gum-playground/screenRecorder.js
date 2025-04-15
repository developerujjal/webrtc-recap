let mediaRecorder;
let recordedBlobs = []; // array to store recorded data

const startRecording = (e) => {

    // const options = {
    //     audioBitsPerSecond: 128000,
    //     videoBitsPerSecond: 2500000,
    //     mimeType: "video/mp4",
    //   };

    if (stream) {
        console.log('start recording');
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
            // check if data is available and push it to the array
            console.log('data available', e.data);
            recordedBlobs.push(e.data);
        };
        mediaRecorder.start(); // start recording
        // console.log('MediaRecorder started', mediaRecorder);
    }

};


const stopRecording = (e) => {
    console.log('stop recording');
    mediaRecorder.stop(); // stop recording 
};


const playRecording = (e) => {
    console.log('play recording')
    const supperBuffer = new Blob(recordedBlobs); // create a blob from the recorded data
    const videoElement = document.querySelector('#other-video');
    videoElement.src = window.URL.createObjectURL(supperBuffer); // create a URL for the blob
    videoElement.controls = true; // show controls for the video
    videoElement.play(); // play the video
};