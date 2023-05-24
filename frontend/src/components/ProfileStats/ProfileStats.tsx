import {
  Typography,
  Divider,
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

const ProfileStats: React.FC<PostsInfo> = ({
  username,
  videoUrls,
  imageUrls,
}) => {
  return (
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
                  {username}
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
                  {imageUrls.length}
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
                  {videoUrls.length}
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
                  {videoUrls.length + imageUrls.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default ProfileStats;
