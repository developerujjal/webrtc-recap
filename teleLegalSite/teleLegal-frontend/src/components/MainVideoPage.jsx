import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxsios from "../hooks/useAxsios";
import "./MainVideoPage.css";
import CallInfo from "./btn/CallInfo";
import ChatWindow from "./ChatWindow";
import ActionButtons from "./btn/ActionButtons";
import addStream from "../reduxStuff/actions/addStream";
import { useDispatch } from "react-redux";

const MainVideoPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [serchParams, setSerchParams] = useSearchParams();
  const [getTokenValue, setGetTokenValue] = useState({});
  const axios = useAxsios();
  const disPatch = useDispatch();

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        disPatch(addStream("localStream", stream));
        
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    const token = serchParams.get("token");
    console.log(token);

    if (token) {
      const fetchDecodedToken = async () => {
        try {
          const res = await axios.get(`/validate-link?token=${token}`);
          console.log(res.data);
          setGetTokenValue(res.data);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      };

      fetchDecodedToken();
    }
  }, [serchParams, axios]);

  return (
    <div className="main-video-page">
      <div className="video-chat-wrapper">
        {/* hold our remote video and local video */}

        <video id="large-feed" autoPlay controls playsInline></video>
        <video id="own-feed" autoPlay controls playsInline></video>
        {getTokenValue.name && <CallInfo apptInfo={getTokenValue} />}
        <ChatWindow />
      </div>

      <ActionButtons />
    </div>
  );
};

export default MainVideoPage;
