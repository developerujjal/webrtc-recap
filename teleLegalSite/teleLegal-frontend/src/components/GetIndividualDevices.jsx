import React from "react";

const GetIndividualDevices = ({
  chanageVideoDevice,
  devicesLists,
  defaultValue,
  type,
}) => {
  let dropdownEl;

  if (type === "video") {
    dropdownEl = devicesLists.map((device, index) => (
      <option key={index} value={device.deviceId}>
        {device.label}
      </option>
    ));
  } else if (type === "audio") {
    let audioInputEl = [];
    let audioOutputEl = [];

    devicesLists.forEach((device, index) => {
      if (device.kind === "audioinput") {
        audioInputEl.push(
          <option key={index} value={device.deviceId}>
            {device.label}
          </option>
        );
      } else if (device.kind === "audiooutput") {
        audioOutputEl.push(
          <option key={index} value={device.deviceId}>
            {device.label}
          </option>
        );
      }
    });

    audioInputEl.unshift(<optgroup key={'input'} label="Input Devices" />)
    audioOutputEl.unshift(<optgroup key={'output'} label="Output Devices" />)

    dropdownEl = audioInputEl.concat(audioOutputEl);
  }

  return (
    <div className="caret-dropdown" style={{ top: "-25px" }}>
      <select
        defaultValue={defaultValue}
        onChange={(e) => chanageVideoDevice(e)}
      >
        {dropdownEl}
        <option>hello</option>
      </select>
    </div>
  );
};

export default GetIndividualDevices;
