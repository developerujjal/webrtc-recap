// it function job is to update all peerConnections (addTracks) and update redux callStaus

import updateCallStatus from "../../reduxStuff/actions/updateCallStatus";

const startLocalVideoStream = (streams, dispatch) => {

    const localStream = streams.localStream;
    console.log("startLocalVideoStream called", localStream);

    for (const stream in streams) {
        if (stream !== 'localStream') {
            // we don't add tracks to the localStream;
            const currentStream = streams[stream];

            localStream.stream.getVideoTracks().forEach((track) => {
                currentStream.peerConnection.addTrack(track, localStream.stream);
            });

            // update redux callStatus
            dispatch(updateCallStatus('video', 'enabled'));

        }
    }

};

export default startLocalVideoStream;