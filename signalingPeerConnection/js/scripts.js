const userName = 'barry' + Math.floor(Math.random() * 100000);
const password = 'x';

document.querySelector('#user-name').innerText = userName;

const localVideoElement = document.querySelector('#local-video');
const remoteVideoElement = document.querySelector('#remote-video');

const socket = io({
    auth: {
        userName,
        password
    }
}); // Socket.io client instance for real-time communication

let localStream; // Local media stream for the local video element
let remoteStream; // Remote media stream for the remote video element
let peerConnection; // Peer connection for WebRTC communication 
let didIOffer = false;


const call = async (e) => {
    try {
        // const mediaStream = await navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: true
        // });

        // localVideoElement.srcObject = mediaStream;
        // localStream = mediaStream;


        // get the userMedia
        await fetchUserMedia();

        // peer connection is created here
        await createPeerConnection();

        // crate offer
        try {
            console.log('Creating offer...');
            const offer = await peerConnection.createOffer();

            // Set the local description to the offer
            await peerConnection.setLocalDescription(offer)
            didIOffer = true; // Set the flag to indicate that we are the offerer
            socket.emit('newOffer', offer); // Send the offer to the server


        } catch (error) {
            console.error('Error creating offer:', error);
        }

    } catch (error) {
        console.error('Error during call:', error);
    }
};


const answerOffer = async (offer) => {
    await fetchUserMedia(); // Get user media before answering the offer
    await createPeerConnection(offer.offer); // Create peer connection with the offer

    // create an answer to the offer received from the signaling server
    const answer = await peerConnection.createAnswer();

    // This is Client 2, and Client 2 is using the answer as the local description
    // console.log(peerConnection.signalingState) // This will be "stable" if we are the one who created the offer
    await peerConnection.setLocalDescription(answer);
    console.log('Answer created:', answer);

    // add the answer to the offer object, so that the server knows which offer this is related to
    offer.answer = answer; // Set the answer in the offer object

    // emit the answer to the signaling server, so that the other client/client1 can receive it;
    // expect a response from the server with the already existing Ice candidates
    // socket.emit('newAnswer', offer);

    const offerIceCandidate = await socket.emitWithAck('newAnswer', offer)


    offerIceCandidate.forEach((iceCandidate) => {
        peerConnection.addIceCandidate(iceCandidate)
        console.log('=====ICE candidate added=====');
    });

    console.log('offerIceCandidate:', offerIceCandidate);

};


const addAnswer = async (offerObj) => {
    // addAnswer is called in the socketListener.js file when the answer is received from the signaling server;
    // at this point, the offer and answer have been exchanged

    await peerConnection.setRemoteDescription(offerObj.answer);

};


const fetchUserMedia = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });

            localVideoElement.srcObject = mediaStream;
            localStream = mediaStream;

            resolve();

        } catch (error) {
            console.error('Error fetching user media:', error);
            reject(error);
        };
    });
};


const createPeerConnection = (offer) => {
    return new Promise(async(resolve, reject) => {
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
        });


        peerConnection.onsignalingstatechange =(e) => {
            console.log(e)
            console.log('Signaling state changed:', peerConnection.signalingState);
        }


        // Both ways below work the same to handle ICE candidate events:
        // 1. Using onicecandidate — simple and only one handler allowed
        // 2. Using addEventListener — more flexible, can add multiple handlers

        // Way: 1
        // peerConnection.onicecandidate = (event) => {
        //     console.log('ICE candidate (onicecandidate):', event.candidate);
        // }


        // Way: 2
        peerConnection.addEventListener('icecandidate', e => {
            console.log('ICE candidate Found....')
            console.log('ICE candidate:', e.candidate);

            if (e.candidate) {
                socket.emit('sendIceCandidateToSignalingServer', {
                    iceCandidate: e.candidate,
                    iceUserName: userName,
                    didIOffer,

                });
            };
        });


        if (offer) {
            // This won't be set if we are tigiring it from the call()
            // This only happens/set when we are tigiring it from the answerOffer() function

            // Set the remote description to the offer received from the signaling server
            // console.log(peerConnection.signalingState) // This will be "stable" if we are the one who created the offer
            await peerConnection.setRemoteDescription(offer);
            // console.log(peerConnection.signalingState) // This will be "have-remote-offer" if we are the one who created the offer

        }

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

