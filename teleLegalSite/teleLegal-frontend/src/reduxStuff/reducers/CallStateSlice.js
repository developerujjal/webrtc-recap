import { createSlice } from "@reduxjs/toolkit";

const initState = {
    current: "idle",
    video: false,
    audio: false,
    audioDevice: 'default',
    videoDevice: 'default',
    shareScreen: false,
    haveMedia: false,
};


const callStateSlice = createSlice({
    name: 'callState',
    initialState: initState,
    reducers: {
        setCallState: (state, action) => {
            state.current = action.payload;
        },
        setVideo: (state, action) => {
            state.video = action.payload;
        },
        setAudio: (state, action) => {
            state.audio = action.payload;
        },
        setAudioDevice: (state, action) => {
            state.audioDevice = action.payload;
        },
        setVideoDevice: (state, action) => {
            state.videoDevice = action.payload;
        },
        setShareScreen: (state, action) => {
            state.shareScreen = action.payload;
        },
        setHaveMedia: (state, action) => {
            state.haveMedia = action.payload;
        },
    }
})

export const { setCallState, setVideo, setAudio, setAudioDevice, setVideoDevice, setShareScreen, setHaveMedia } = callStateSlice.actions;
export default callStateSlice.reducer;