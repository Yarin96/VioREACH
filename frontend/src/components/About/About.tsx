import MainContainer from "../../shared/components/Container/MainContainer";
import { Typography, Divider, Container } from "@mui/material";
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
          software solutions.
        </Typography>
        <Divider />
      </Container>
    </MainContainer>
  );
};

export default About;
