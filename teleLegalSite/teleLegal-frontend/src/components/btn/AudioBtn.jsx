import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetIndividualDevices from "../GetIndividualDevices";
import getDevices from "../../utilies/getDevices";
import updateCallStatus from "../../reduxStuff/actions/updateCallStatus";
import addStream from "../../reduxStuff/actions/addStream";
import startAudioStream from "./startAudioStream";

const AudioBtn = ({ smallFeedEl }) => {
  const callStatus = useSelector((state) => state.callStatus);
  const streams = useSelector((state) => state.streams);
  const [openAudioDevices, setOpenAudioDevices] = useState(false);
  const [audioDevicesLists, setAudioDevicesLists] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAudioDevices = async () => {
      if (openAudioDevices) {
        const devices = await getDevices();
        setAudioDevicesLists(
          devices.audioOutputDevices.concat(devices.audioDevices)
        );
      }
    };

    getAudioDevices();
  }, [openAudioDevices]);

  const startStopAudio = () => {
    if (callStatus.audio === "enabled") {
      // update the redux
      dispatch(updateCallStatus("audio", "disabled"));
      // set the audio stream disabled

      const audioTracks = streams.localStream.stream.getAudioTracks();

      audioTracks.forEach((track) => {
        track.enabled = false;
      });
    } else if (callStatus.audio === "disabled") {
      // second check if the audio is disabled then we need to enabled;
      // update the redux
      dispatch(updateCallStatus("audio", "enabled"));

      // set the video stream endabled

      const audioTracks = streams.localStream.stream.getAudioTracks();

      audioTracks.forEach((track) => {
        track.enabled = true;
      });
    } else {
      // audio is off, so what to do?
      chanageAudioDevice({ target: { value: "inputDefault" } });

      startAudioStream(streams)
    }
  };

  const chanageAudioDevice = async (e) => {
    //1. we have got deviceId and deviceType from the event
    const deviceId = e.target.value.slice(5);
    const deviceType = e.target.value.slice(0, 5);

    if (deviceType === "ouput") {
      smallFeedEl.current.setSinkId(deviceId);
    } else if (deviceType === "input") {
      const newConstraints = {
        audio: { deviceId: { exact: deviceId } },

        video:
          callStatus.videoDevice === "default"
            ? true
            : { deviceId: { exact: callStatus.videoDevice } },
      };

      const getUserMediaStream = await navigator.mediaDevices.getUserMedia(
        newConstraints
      );

      //2. update redux with that audioDevice deviceId and audio is enabled
      dispatch(updateCallStatus("audioDevice", deviceId));
      dispatch(updateCallStatus("audio", "enabled"));

      dispatch(addStream("localStream", getUserMediaStream));

      const tracks = getUserMediaStream.getAudioTracks();
      // come back here later
    }
  };

  let micText;
  if (callStatus.audio === "off") {
    micText = "Join Audio";
  } else if (callStatus.audio === "enabled") {
    micText = "Mute";
  } else {
    micText = "Unmute";
  }

  return (
    <div className="button-wrapper d-inline-block">
      <i
        onClick={() => setOpenAudioDevices(!openAudioDevices)}
        className="fa fa-caret-up choose-audio"
      ></i>
      <div onClick={startStopAudio} className="button mic">
        <i className="fa fa-microphone"></i>
        <div className="btn-text">{micText}</div>
      </div>

      {openAudioDevices && (
        <GetIndividualDevices
          chanageVideoDevice={chanageAudioDevice}
          devicesLists={audioDevicesLists}
          defaultValue={callStatus.audioDevice}
          type="audio"
        />
      )}
    </div>
  );
};

export default AudioBtn;
