import React, { useEffect, useState } from "react";
import getDevices from "../utilies/getDevices";

const VideoDevices = () => {
  const [videoDevicesLists, setVideoDevicesLists] = useState([]);

  useEffect(() => {
    const getDevicesAync = async () => {
      const devices = await getDevices();
      setVideoDevicesLists(devices.videoDevices);
    };

    getDevicesAync();
  }, []);


  const chanageVideoDevice = () => {};

  return (
    <div className="caret-dropdown" style={{ top: "-25px" }}>
      <select defaultValue={1} onChange={chanageVideoDevice}>
        {videoDevicesLists.map((device, index) => {
          return (
            <option key={index} value={device.deviceId}>
              {device.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default VideoDevices;
