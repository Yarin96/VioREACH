import MainContainer from "../../shared/components/Container/MainContainer";
import { Typography, Divider, Container } from "@mui/material";
import "./About.css";

const About = () => {
  return (
    <MainContainer>
      <Container style={{ marginTop: "26px" }}>
        <Typography variant="h4" style={{ marginBottom: "16px" }}>
          About Us
        </Typography>
        <Divider />
        <Typography variant="body1" style={{ marginTop: "16px" }}>
          We are both passionate software developers, striving for greatness.
        </Typography>
      </Container>
    </MainContainer>
  );
};

export default About;
