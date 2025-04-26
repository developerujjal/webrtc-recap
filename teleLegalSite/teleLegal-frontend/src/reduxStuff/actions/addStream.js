export default(who, stream) => {
   return {
    type: 'ADD_STREAM',
    payLoad: {
        who,
        stream,
    }
   }
}