import React, { useState } from "react";
import axios from "axios";
import "./Detection.css";
import Button from "../../shared/components/UIElements/Button/Button";

const Detection: React.FC = () => {
  const [result, setResult] = useState(null);

  // API set essential parameters
  const accessToken =
    "IGQVJVT3BGX3ZA6bU02ZAEMxajIxTlhUSDFwSEZAOU3RvaFlwN3VVVk9ZAOGdJc0YzbXVjMVRkVVJKS1Fva1RpN2hwUDZAXV3d4VkEtNE9CZAmxIZATBZATmhhY29hT2tJdXpqWHp5MWdpQ3A5T0RsTGRCMmIyQwZDZD";
  const url = "https://graph.instagram.com/me/media";
  const params = {
    fields: "id,caption,media_type,media_url,thumbnail_url",
    access_token: accessToken,
  };

  const sendDataToServer = async (videos: any) => {
    try {
      const response: any = await axios.post(
        "http://127.0.0.1:5000/detect-video",
        {
          video_url: videos[1],
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
        const response = await axios.get(url, { params });
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
    <div>
      <h2>The Violence Detection Scanner!</h2>
      <h3>
        Click the button to start scanning your social media account using our
        algorithm.
      </h3>
      <Button onClick={clickHandler} />
    </div>
  );
};

export default Detection;
