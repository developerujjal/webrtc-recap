import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import startLocalVideoStream from "./startLocalVideoStream";
import updateCallStatus from "../../reduxStuff/actions/updateCallStatus";
import VideoDevices from "../VideoDevices";
import addStream from "../../reduxStuff/actions/addStream";
import getDevices from "../../utilies/getDevices";

const VideoButton = ({ smallFeedEl }) => {
  const callStatus = useSelector((state) => state.callStatus);
  const streams = useSelector((state) => state.streams);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [videoDevicesOpen, setVideoDevicesOpen] = useState(false);
  const [videoDevicesLists, setVideoDevicesLists] = useState([]);
  const dispatch = useDispatch();

  console.log(streams);

  const startStopVideo = () => {
    console.log("startStopVideo clicked");

    // first check if the video is already enabled

    if (callStatus.video === "enabled") {
      // update the redux
      dispatch(updateCallStatus("video", "disabled"));
      // set the video stream disabled

      const videoTracks = streams.localStream.stream.getVideoTracks();

      videoTracks.forEach((track) => {
        track.enabled = false;
      });
    } else if (callStatus.video === "disabled") {
      // second check if the video is disabled then we need to enabled;
      // update the redux
      dispatch(updateCallStatus("video", "enabled"));

      // set the video stream endabled

      const videoTracks = streams.localStream.stream.getVideoTracks();

      videoTracks.forEach((track) => {
        track.enabled = true;
      });
    } else if (callStatus.haveMedia) {
      //thirdly, we have to check the media, if so start the video stream
      smallFeedEl.current.srcObject = streams.localStream.stream;

      startLocalVideoStream(streams, dispatch);
    } else {
      // it possible that we don't have the media yet, so we need to wait for it to be available
      setPendingUpdate(true);
    }
  };

  useEffect(() => {
    if (videoDevicesOpen) {
      const getDevicesAync = async () => {
        const devices = await getDevices();
        setVideoDevicesLists(devices.videoDevices);
      };

      getDevicesAync();
    }
  }, [videoDevicesOpen]);

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

    // 3. update redux with that videoDevice deviceId and video is enabled
    dispatch(updateCallStatus("videoDevice", videoDeviceId));
    dispatch(updateCallStatus("video", "enabled"));

    // 4 update the smallFeedEl
    smallFeedEl.current.srcObject = getUserMediaStream;

    // 5. we need to update the localStream with the new stream
    dispatch(addStream("localStream", getUserMediaStream));

    // 6. add tarcks
    const tracks = getUserMediaStream.getVideoTracks();
    // we will back here later
    // if we stop the old tracks, and add the new tracks, the will mean renagotiation...
  };

  useEffect(() => {
    // it will be called when the pendingUpdate is true
    if (pendingUpdate && callStatus.haveMedia) {
      console.log("pendingUpdate is true, and we have media now");
      setPendingUpdate(false);
      smallFeedEl.current.srcObject = streams.localStream.stream;
      startLocalVideoStream(streams, dispatch);
    }
  }, [callStatus.haveMedia, pendingUpdate]);

  return (
    <div className="button-wrapper video-button d-inline-block">
      <i
        onClick={() => setVideoDevicesOpen(!videoDevicesOpen)}
        className="fa fa-caret-up choose-video"
      ></i>
      <div onClick={startStopVideo} className="button camera">
        <i className="fa fa-video"></i>
        <div className="btn-text">
          {callStatus.video === "enabled" ? "Stop" : "Start"} Video
        </div>
      </div>

      {videoDevicesOpen && (
        <VideoDevices
          chanageVideoDevice={chanageVideoDevice}
          videoDevicesLists={videoDevicesLists}
          callStatus={callStatus}
        />
      )}
    </div>
  );
};

export default VideoButton;
