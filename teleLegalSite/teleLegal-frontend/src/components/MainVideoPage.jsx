import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxsios from "../hooks/useAxsios";

const MainVideoPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [serchParams, setSerchParams] = useSearchParams();
  const [getTokenValue, setGetTokenValue] = useState({});

  const axios = useAxsios();

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

  return <div>
    <h1>Person Name: {getTokenValue?.name}</h1>
  </div>;
};

export default MainVideoPage;
