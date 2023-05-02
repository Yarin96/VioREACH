import React, { useState } from "react";
import axios from "axios";
import "./Detection.css";
import Button from "../../shared/components/UIElements/Button/Button";
import Instructions from "./Instructions";
import MainContainer from "../../shared/components/Container/MainContainer";

const Detection: React.FC = () => {
  const [result, setResult] = useState(null);

  const sendDataToServer = async (videos: any) => {
    try {
      const tempToken = localStorage.getItem("token");
      const response: any = await axios.post(
        "http://127.0.0.1:5000/detection",
        {
          video_url: videos[1],
        },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      setResult(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const openNewWindow = (url: string, width: number, height: number) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const features = `left=${left},top=${top},width=${width},height=${height}`;
    const authWindow = window.open(url, "_blank", features)?.focus();

    return authWindow;
  };

  const getInstagramAccessHandler = async () => {
    try {
      const appId = process.env.REACT_APP_APP_ID_KEY;
      const redirectUri = process.env.REACT_APP_REDIRECT_URI;
      let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
      openNewWindow(url, 600, 600);
      const response: any = await axios.get("https://localhost:8443/detection");
      // sendDataToServer(response.data.videoList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <Instructions />
      <Button text="Permit Access" onClick={getInstagramAccessHandler} />
    </MainContainer>
  );
};

export default Detection;
