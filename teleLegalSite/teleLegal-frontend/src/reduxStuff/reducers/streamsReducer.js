// hold all of the streams that are being used in the app
// who and stream


export default (state, action) => {
    if (action.type === 'ADD_STREAM') {

        const copyState = { ...state };
        copyState[action.payLoad.who] = action.payLoad;

        return copyState;

    } else if (action.type === "LOGOUT_ACTIONS") {
        return {};
    } else {
        return state;
    };
}