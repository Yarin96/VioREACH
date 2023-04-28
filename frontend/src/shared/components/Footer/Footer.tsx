import { Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Toolbar
      style={{
        position: "fixed",
        bottom: "0",
        backgroundColor: "#FEFEFE",
        height: "50px",
        width: "100%",
        color: "black",
        zIndex: "6",
        padding: "0",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        fontFamily={"'Barlow Semi Condensed', sans-serif"}
      >
        © 2023 VioREACH - By Yarin Bar & Ben Daniels
      </Typography>
    </Toolbar>
  );
};

export default Footer;
