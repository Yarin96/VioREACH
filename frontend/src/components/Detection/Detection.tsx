import React, { useState } from "react";
import axios from "axios";
import "./Detection.css";
import Title from "./Title";
import Instructions from "./Instructions";
import MainContainer from "../../shared/components/Container/MainContainer";
import ProfileStats from "../ProfileStats/ProfileStats";
import ActivationButton from "./ActivationButton";
import ResultsPage from "../ResultsPage/ResultsPage";
import { Container, Button, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface PostsInfo {
  username: string;
  videoUrls: string[];
  imageUrls: string[];
}

const Detection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<number[]>([]);
  const [arePostsExtracted, setArePostsExtracted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [postsInfo, setPostsInfo] = useState<PostsInfo>({
    username: "default",
    videoUrls: [],
    imageUrls: [],
  });

  const extractPostsHandler = async () => {
    try {
      const response: any = await axios.get(
        "https://localhost:8443/detection/posts"
      );

      setArePostsExtracted(true);
      // console.log(response.data.fetchedData);
      setPostsInfo((prevPostsInfo) => {
        return {
          ...prevPostsInfo,
          username: response.data.fetchedData.data[0].username,
          videoUrls: response.data.fetchedData.data
            .filter((item: any) => item.media_type === "VIDEO")
            .map((item: any) => item.media_url),
          imageUrls: response.data.fetchedData.data
            .filter((item: any) => item.media_type === "IMAGE")
            .map((item: any) => item.media_url),
        };
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const openNewWindow = (url: string, width: number, height: number) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const features = `left=${left},top=${top},width=${width},height=${height}`;
    window.open(url, "_blank", features)?.focus();
  };

  const getInstagramAccessHandler = async () => {
    try {
      setIsLoading(true);
      setIsClicked(true);
      const appId = process.env.REACT_APP_APP_ID_KEY;
      const redirectUri = process.env.REACT_APP_REDIRECT_URI;
      let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
      openNewWindow(url, 600, 600);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDataToServer = async () => {
    try {
      setIsLoading(true);
      const tempToken = localStorage.getItem("token");
      const response: any = await axios.post(
        "http://127.0.0.1:5000/detection",
        {
          // 10 - VIOLENCE, 4 - NONVIOLENCE
          video_url: postsInfo.videoUrls[10],
        },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      console.log(response.data);
      setResult(response.data.result);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <MainContainer>
      <Container style={{ marginTop: "16px", marginBottom: "56px" }}>
        <Title />
        {!isClicked && !arePostsExtracted && (
          <Instructions onAccessClick={getInstagramAccessHandler} />
        )}
        {isClicked && !arePostsExtracted && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "26px",
              maxWidth: 400,
              mx: "auto",
            }}
          >
            {isLoading ? (
              <CircularProgress
                size={64}
                sx={{ color: "#15b8ff", mx: "auto" }}
              />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: "12px" }}
                onClick={extractPostsHandler}
              >
                Extract Posts
              </Button>
            )}
          </Box>
        )}
        {isClicked && arePostsExtracted && <ProfileStats {...postsInfo} />}
        {isClicked && arePostsExtracted && result.length === 0 && (
          <ActivationButton
            isLoading={isLoading}
            sendDataToServer={sendDataToServer}
          />
        )}
        {isClicked && arePostsExtracted && result.length !== 0 && (
          <ResultsPage result={result} />
        )}
      </Container>
    </MainContainer>
  );
};

export default Detection;
