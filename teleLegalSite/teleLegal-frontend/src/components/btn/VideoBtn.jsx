import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import startLocalVideoStream from "./startLocalVideoStream";

const VideoButton = ({ smallFeedEl }) => {
  const callStatus = useSelector((state) => state.callStatus);
  const streams = useSelector((state) => state.streams);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const dispatch = useDispatch();

  console.log(streams)

  const startStopVideo = () => {
    console.log("startStopVideo clicked");
    if (callStatus.haveMedia) {
      // we have the media, so we can start/show feed stop the video;

      smallFeedEl.current.srcObject = streams.localStream.stream;

      startLocalVideoStream(streams, dispatch);


    } else {
      // it possible that we don't have the media yet, so we need to wait for it to be available
      setPendingUpdate(true);
    }
  };


  useEffect(() => {
    // it will be called when the pendingUpdate is true
    if (pendingUpdate && callStatus.haveMedia) {
      console.log("pendingUpdate is true, and we have media now");
      setPendingUpdate(false);
      smallFeedEl.current.srcObject = streams.localStream.stream;
    }
  }, [callStatus.haveMedia, pendingUpdate]);

  return (
    <div className="button-wrapper video-button d-inline-block">
      <i className="fa fa-caret-up choose-video"></i>
      <div onClick={startStopVideo} className="button camera">
        <i className="fa fa-video"></i>
        <div className="btn-text">
          {callStatus.video === "display" ? "Stop" : "Start"} Video
        </div>
      </div>
    </div>
  );
};

export default VideoButton;
