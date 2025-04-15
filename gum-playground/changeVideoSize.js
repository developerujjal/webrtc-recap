const getSupportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(getSupportedConstraints)

const changeVideoSize = (e) => {
    // console.log('changeVideoSize')
    // stream.getTracks().forEach((track) => {
    //    const capabilities = track.getCapabilities();
    //    console.log(capabilities);

    // })

    stream.getVideoTracks().forEach((track) => {
        const capabilities = track.getCapabilities();
        // console.log(capabilities);
        const videoWidth = document.querySelector('#vid-width').value;
        const videoHeight = document.querySelector('#vid-height').value;
        const constraints = {
            width: {exact: videoWidth < capabilities.width.max ? videoWidth : capabilities.width.max },
            height: {exact: videoHeight < capabilities.height.max ? videoHeight : capabilities.height.max},
        };

        track.applyConstraints(constraints);

        console.log(capabilities)
    })
}