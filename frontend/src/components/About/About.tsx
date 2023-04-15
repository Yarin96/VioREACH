import MainContainer from "../../shared/components/Container/MainContainer";
import { Typography, Divider, Container } from "@mui/material";
import "./About.css";

const About = () => {
  return (
    <MainContainer>
      <Container style={{ marginTop: "56px" }}>
        <Typography
          fontWeight="bold"
          variant="h3"
          style={{ marginBottom: "16px" }}
          fontFamily={"'Rubik', sans-serif"}
        >
          About Us
        </Typography>
        <Divider />
        <Typography variant="body1" style={{ marginTop: "16px" }}>
          We are both passionate software developers, striving for greatness.
        </Typography>
        <Divider />
      </Container>
    </MainContainer>
  );
};

export default About;
