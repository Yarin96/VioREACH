import MainContainer from "../../shared/components/Container/MainContainer";
import { Typography, Divider, Container, Grid } from "@mui/material";
import EyeProtectorImg from "./images/eyeprotect.png";
import DeveloperImg from "./images/developer.png";
import TechnologiesCarousel from "./TechnologiesCarousel/TechnologiesCarousel";
import "./Introduction.css";

const Introduction = () => {
  return (
    <MainContainer>
      <Container style={{ marginTop: "56px" }}>
        <Typography
          fontWeight="bold"
          variant="h2"
          style={{ marginTop: "36px", marginBottom: "6px" }}
          fontFamily={"'Rubik', sans-serif"}
        >
          Track. Detect. Prevent.
        </Typography>
        <Typography
          variant="h5"
          style={{ marginBottom: "36px" }}
          fontFamily={"'Barlow Semi Condensed', sans-serif"}
        >
          - Violence protection across the internet -
        </Typography>
      </Container>
      <Container style={{ marginTop: "56px" }}>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <img
              src={EyeProtectorImg}
              alt="eye-protector"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              variant="body1"
              textAlign="left"
              fontWeight="bold"
              style={{ marginTop: "46px", width: "88%" }}
            >
              The number one platform in which we encounter human violence these
              days - is the social media.
              <br />
              <br />
              Typically, you can find videos published around Instagram,
              Facebook etc. that contain various acts of violence, including use
              of weapons, boycotts and bullying.
              <br />
              <br /> That's where VioREACH kicks in.
              <br />
              Our mission is to reduce as much as possible the violence and harm
              that surrounds young people. By providing access to your child's
              social media accounts, we scan videos uploaded by your child and
              identify suspected violent behavior. These activities will be
              reported to the concerned parent for further follow-up.
              <br />
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography
              variant="body1"
              textAlign="left"
              fontWeight="bold"
              style={{ marginTop: "56px", marginLeft: "32px", width: "88%" }}
            >
              To achieve this goal, we use various advanced technologies.
              <br /> <br />• We use machine learning tools to recognize objects
              in videos by using pre-trained models and different classifiers,
              which work together to produce the final result with the highest
              possible accuracy.
              <br /> <br />• We provide a high level of confidentiality by
              giving a secure registration process to our system using trusted
              cryptographic algorithms for authentication and authorization
              purposes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <img
              src={DeveloperImg}
              alt="developer"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid>
          <Typography
            fontWeight="bold"
            variant="h4"
            style={{ marginTop: "56px", marginBottom: "6px" }}
            fontFamily={"'Rubik', sans-serif"}
          >
            Technologies Stack
          </Typography>
        </Grid>
        <Grid style={{ marginTop: "56px", marginBottom: "26px" }}>
          <TechnologiesCarousel />
        </Grid>
      </Container>
    </MainContainer>
  );
};

export default Introduction;
