import React, { useState } from "react";
import axios from "axios";
import "./Detection.css";
import Button from "../../shared/components/UIElements/Button/Button";

const Detection: React.FC = () => {
  const [result, setResult] = useState(null);

  const accessToken = process.env.REACT_APP_INSTAGRAM_API_KEY;
  const fields = "id,caption,media_type,media_url,thumbnail_url";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}`;

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

  const clickHandler = async () => {
    const fetchVideosFromAPI = async () => {
      const videosUrls = [];

      try {
        const response = await axios.get(url);
        const fetchedData = await response.data;

        for (const item of fetchedData.data) {
          if (item.media_type === "VIDEO") {
            videosUrls.push(item.media_url);
          }
        }

        return videosUrls;
      } catch (error: any) {
        console.log(error.message);
      }
    };

    const result = await fetchVideosFromAPI();
    console.log(result);
    sendDataToServer(result);
  };

  return (
    <div className="detect-container">
      <h2>The Violence Detection Scanner!</h2>
      <h3>
        Click the button to start scanning your social media account using our
        algorithm.
      </h3>
      <Button text="Start Scanning" onClick={clickHandler} />
    </div>
  );
};

export default Detection;
