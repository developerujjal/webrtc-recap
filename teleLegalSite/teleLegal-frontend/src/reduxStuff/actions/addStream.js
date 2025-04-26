export default(who, stream, peerConnection) => {
   return {
    type: 'ADD_STREAM',
    payLoad: {
        who,
        stream,
        peerConnection
    }
   }
}