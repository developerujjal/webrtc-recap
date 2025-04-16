const localVideoElement = document.querySelector('#local-video');
const remoteVideoElement = document.querySelector('#remote-video');

let localStream;
let remoteStream;
let peerConnection;

const call = async (e) => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        localVideoElement.srcObject = mediaStream;

    } catch (error) {
        console.error('Error during call:', error);
    }
}


document.querySelector('#call').addEventListener('click', e => call(e))



// peerConnection = new RTCPeerConnection(iceServers);

// localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// localVideoElement.srcObject = localStream;

// localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

// peerConnection.onicecandidate = event => {
//     if (event.candidate) {
//         console.log('New ICE candidate:', event.candidate);
//     }
// };

// remoteStream = new MediaStream();
// remoteVideoElement.srcObject = remoteStream;

// peerConnection.ontrack = event => {
//     remoteStream.addTrack(event.track);
// };

// const offer = await peerConnection.createOffer();
// await peerConnection.setLocalDescription(offer);

// console.log('Offer sent:', offer);