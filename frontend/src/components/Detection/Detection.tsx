import React, { useState } from "react";
import axios from "axios";
import "./Detection.css";
import Instructions from "./Instructions";
import MainContainer from "../../shared/components/Container/MainContainer";
import {
  Typography,
  Container,
  Divider,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";

interface PostsInfo {
  username: string;
  videoUrls: string[];
  imageUrls: string[];
}

const Detection: React.FC = () => {
  const [result, setResult] = useState(null);
  const [arePostsExtracted, setArePostsExtracted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [postsInfo, setPostsInfo] = useState<PostsInfo>({
    username: "default",
    videoUrls: [],
    imageUrls: [],
  });

  const extractPostsHandler = async (event: any) => {
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
  };

  const openNewWindow = (url: string, width: number, height: number) => {
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const features = `left=${left},top=${top},width=${width},height=${height}`;
    window.open(url, "_blank", features)?.focus();
  };

  const getInstagramAccessHandler = async () => {
    try {
      setIsClicked(true);
      const appId = process.env.REACT_APP_APP_ID_KEY;
      const redirectUri = process.env.REACT_APP_REDIRECT_URI;
      let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
      openNewWindow(url, 600, 600);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDataToServer = async () => {
    try {
      const tempToken = localStorage.getItem("token");
      const response: any = await axios.post(
        "http://127.0.0.1:5000/detection",
        {
          video_url: postsInfo.videoUrls[0],
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

  return (
    <MainContainer>
      <Container style={{ marginTop: "16px", marginBottom: "56px" }}>
        <Typography
          fontWeight="bold"
          variant="h2"
          style={{ marginTop: "36px", marginBottom: "26px" }}
          fontFamily={"'Rubik', sans-serif"}
        >
          Detection Scanner 🔍
        </Typography>
        <Divider />
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: "12px" }}
              onClick={extractPostsHandler}
            >
              Extract Posts
            </Button>
          </Box>
        )}
        {isClicked && arePostsExtracted && (
          <>
            <Typography
              fontWeight="bold"
              variant="h5"
              style={{
                marginTop: "36px",
                marginBottom: "86px",
                textDecoration: "underline",
              }}
              fontFamily={"'Rubik', sans-serif"}
            >
              Profile History Stats
            </Typography>
            <Grid container spacing={20} style={{ marginBottom: "56px" }}>
              <Grid item xs={12} md={3}>
                <Card sx={{ bgcolor: "#F1B000", color: "#333" }}>
                  <CardActionArea>
                    <AccountCircleIcon style={{ fontSize: 80 }} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Username
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {postsInfo.username}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ bgcolor: "#319938", color: "#333" }}>
                  <CardActionArea>
                    <ImageIcon style={{ fontSize: 80 }} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        No. of Images
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {postsInfo.imageUrls.length}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ bgcolor: "#00adec", color: "#333" }}>
                  <CardActionArea>
                    <OndemandVideoIcon style={{ fontSize: 80 }} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        No. of Videos
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {postsInfo.videoUrls.length}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card sx={{ bgcolor: "#b2ec73", color: "#333" }}>
                  <CardActionArea>
                    <DynamicFeedIcon style={{ fontSize: 80 }} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Total Posts
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {postsInfo.videoUrls.length +
                          postsInfo.imageUrls.length}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
            <Divider />
            <Typography
              fontWeight="bold"
              variant="h5"
              style={{
                marginTop: "36px",
                marginBottom: "36px",
                textDecoration: "underline",
              }}
              fontFamily={"'Rubik', sans-serif"}
            >
              Activate Our Algorithm
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: "12px" }}
              onClick={sendDataToServer}
            >
              Start Scanning Your Profile
            </Button>
          </>
        )}
      </Container>
    </MainContainer>
  );
};

export default Detection;
