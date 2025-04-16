const localVideoElement = document.querySelector('#local-video');
const remoteVideoElement = document.querySelector('#remote-video');

let localStream; // Local media stream for the local video element
let remoteStream; // Remote media stream for the remote video element
let peerConnection; // Peer connection for WebRTC communication 

const call = async (e) => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });

        localVideoElement.srcObject = mediaStream;
        localStream = mediaStream;

        // peer connection is created here
        await createPeerConnection();

        // crate offer
        try {
            console.log('Creating offer...');
            const offer = await peerConnection.createOffer();
            console.log('Offer created:', offer);

        } catch (error) {
            console.error('Error creating offer:', error);
        }

    } catch (error) {
        console.error('Error during call:', error);
    }
};


const createPeerConnection = () => {
    return new Promise((resolve, reject) => {
        // Create a new RTCPeerConnection instance with ICE servers configuration
        peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' }
            ]
        });

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        })

        
        peerConnection.addEventListener('icecandidate', e => {
            console.log('ICE candidate Found....')
            console.log('ICE candidate:', e.candidate);
        });

        resolve();

    })

};


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