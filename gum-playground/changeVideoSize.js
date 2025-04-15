const getSupportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(getSupportedConstraints)

const changeVideoSize = (e) => {
    console.log('changeVideoSize')
    stream.getTracks().forEach((track) => {
       const capabilities = track.getCapabilities();
       console.log(capabilities);
    })
}

document.querySelector('#change-size').addEventListener('click', e => changeVideoSize(e))