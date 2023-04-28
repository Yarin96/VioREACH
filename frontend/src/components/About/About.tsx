import MainContainer from "../../shared/components/Container/MainContainer";
import {
  Typography,
  Divider,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import BenImg from "./images/Ben.png";
import YarinImg from "./images/Yarin.png";
import IdeasImg from "./images/ideas.png";
import "./About.css";

const About = () => {
  return (
    <MainContainer>
      <Container
        style={{
          alignItems: "center",
          marginTop: "56px",
        }}
      >
        <Typography
          fontWeight="bold"
          variant="h3"
          style={{ marginBottom: "56px" }}
          fontFamily={"'Rubik', sans-serif"}
        >
          About Us
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "56px",
            marginBottom: "56px",
          }}
        >
          Our software development team is comprised of highly-skilled and
          experienced professionals who are passionate about creating innovative
          software solutions. We adopted this project to challenge ourselves
          with the vast world of Machine Learning. Please let us know your
          thoughts and if there are any additional features or improvements you
          would like to see in our system.
          <br /> Feel free to contact us! 💙
        </Typography>
        <Divider style={{ margin: "26px 26px" }} />
        <Grid container spacing={25} style={{ marginBottom: "56px" }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                sx={{ height: 340 }}
                image={BenImg}
                title="Ben Daniels"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ben Daniels
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Software Developer
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="small">
                  <a
                    href="https://www.linkedin.com/in/bendaniels-p/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
                <Button size="small">
                  <a
                    href="https://www.facebook.com/get.out.from.my.page"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                sx={{ height: 340 }}
                image={YarinImg}
                title="Yarin Bar"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Yarin Bar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Software Developer
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button size="small">
                  <a
                    href="https://www.linkedin.com/in/yarinb/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
                <Button size="small">
                  <a
                    href="https://www.facebook.com/profile.php?id=100065295773673"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Divider style={{ margin: "26px 26px" }} />
        <Grid item xs={12} md={5}>
          <img
            src={IdeasImg}
            alt="ideas"
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </Grid>
      </Container>
    </MainContainer>
  );
};

export default About;
