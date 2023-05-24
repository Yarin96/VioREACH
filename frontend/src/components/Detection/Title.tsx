import { Typography, Divider } from "@mui/material";

const Title: React.FC = () => {
  return (
    <>
      <Typography
        fontWeight="bold"
        variant="h2"
        style={{ marginTop: "36px", marginBottom: "26px" }}
        fontFamily={"'Rubik', sans-serif"}
      >
        Detection Scanner 🔍
      </Typography>
      <Divider />
    </>
  );
};

export default Title;
