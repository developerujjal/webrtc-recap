import React from "react";

const VideoDevices = ({
  chanageVideoDevice,
  videoDevicesLists,
  callStatus,
}) => {
  return (
    <div className="caret-dropdown" style={{ top: "-25px" }}>
      <select
        defaultValue={callStatus.videoDevice}
        onChange={(e) => chanageVideoDevice(e)}
      >
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
