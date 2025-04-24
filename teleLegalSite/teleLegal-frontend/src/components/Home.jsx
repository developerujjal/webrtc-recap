import React, { useEffect } from "react";
import useAxsios from "../hooks/useAxsios";
import { useNavigate } from "react-router";

const Home = () => {
  const axios = useAxsios();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/user-link");
      if (res.data.token) {
       return navigate("/join-video?token=" + res.data.token);
      }
    };

    fetchData();
  }, [axios, navigate]);

  return <div>Hello This is Home page</div>;
};

export default Home;
