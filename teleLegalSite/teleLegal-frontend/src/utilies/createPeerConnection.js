

const createPeerConnection = () => {
    // does async work here?
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {

        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302",
                },

            ],
        });

        //rtcPeerConnection is the connection to the peer;
        //we may need more than one this time!!
        //we pass it the iceServers to use
        //it will get us ICE candidates to send to the other peer

        const remoteStream = new MediaStream();

        peerConnection.addEventListener('signalingstatechange', (e) => {
            console.log('Signaling state change:', peerConnection.signalingState);
            console.log(e)
        });


        peerConnection.addEventListener('icecandidate', (e) => {
            console.log('Found ice candidate....')
            if (e.candidate) {
                // emit to socket server
            }
        });

        resolve({
            peerConnection,
            remoteStream,
        });
    })
};

export default createPeerConnection;