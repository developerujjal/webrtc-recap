import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GetIndividualDevices from "../GetIndividualDevices";
import getDevices from "../../utilies/getDevices";

const AudioBtn = () => {
  const callStatus = useSelector((state) => state.callStatus);
  const [openAudioDevices, setOpenAudioDevices] = useState(false);
  const [audioDevicesLists, setAudioDevicesLists] = useState([]);

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

  const chanageAudioDevice = (e) => {};

  let micText;
  if (callStatus.current === "idle") {
    micText = "Join Audio";
  } else if (callStatus.audio) {
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
      <div className="button mic">
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
