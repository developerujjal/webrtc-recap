import React from 'react';
import updateCallStatus from '../../reduxStuff/actions/updateCallStatus';

const startAudioStream = (streams) => {

    const localStream = streams.localStream;
    console.log("startLocalVideoStream called", localStream);

    for (const stream in streams) {
        if (stream !== 'localStream') {
            // we don't add tracks to the localStream;
            const currentStream = streams[stream];

            localStream.stream.getAudioTracks().forEach((track) => {
                currentStream.peerConnection.addTrack(track, localStream.stream);
            });

            // // update redux callStatus
            // dispatch(updateCallStatus('audio', 'enabled'));

        };
    };

};

export default startAudioStream;