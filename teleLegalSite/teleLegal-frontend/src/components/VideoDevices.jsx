import React, { useEffect, useState } from "react";
import getDevices from "../utilies/getDevices";
import { useDispatch, useSelector } from "react-redux";
import updateCallStatus from "../reduxStuff/actions/updateCallStatus";
import addStream from "../reduxStuff/actions/addStream";

const VideoDevices = ({ smallFeedEl }) => {
  const [videoDevicesLists, setVideoDevicesLists] = useState([]);
  const callStatus = useSelector((state) => state.callStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDevicesAync = async () => {
      const devices = await getDevices();
      setVideoDevicesLists(devices.videoDevices);
    };

    getDevicesAync();
  }, []);

  const chanageVideoDevice = async (e) => {
    // the user has selected a new video device
    // 1. get the selected device
    const videoDeviceId = e.target.value;

    // 2. we need to getUserMedia permission
    const newConstraints = {
      audio:
        callStatus.audioDevice === "default"
          ? true
          : { deviceId: { exact: callStatus.audioDevice } },
      video: { deviceId: { exact: videoDeviceId } },
    };

    const getUserMediaStream = await navigator.mediaDevices.getUserMedia(
      newConstraints
    );

    // 3. update redux with that videoDevice deviceId
    dispatch(updateCallStatus("videoDevice", videoDeviceId));

    // 4 update the smallFeedEl
    smallFeedEl.current.srcObject = getUserMediaStream;

    // 5. we need to update the localStream with the new stream
    dispatch(addStream("localStream", getUserMediaStream));

    // 6. add tarcks
  };

  return (
    <div className="caret-dropdown" style={{ top: "-25px" }}>
      <select defaultValue={1} onChange={(e) => chanageVideoDevice(e)}>
        {videoDevicesLists.map((device, index) => {
          return (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          );
        })}
        <option>hello</option>
      </select>
    </div>
  );
};

export default VideoDevices;
