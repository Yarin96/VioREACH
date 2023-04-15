import { Typography, Divider, Container } from "@mui/material";

const Instructions = () => {
  return (
    <Container style={{ marginTop: "26px" }}>
      <Typography variant="h4" style={{ marginBottom: "16px" }}>
        The Violence Detection Scanner!
      </Typography>
      <Divider />
      <Typography variant="body1" style={{ marginTop: "16px" }}>
        First, log in to your Instagram account and grant user permissions.
        Then, click the button to start scanning your social media account using
        our algorithm.
      </Typography>
    </Container>
  );
};

export default Instructions;
