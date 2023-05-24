import { Typography, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface ActivationButtonProps {
  isLoading: boolean;
  sendDataToServer: () => Promise<void>;
}

const ActivationButton: React.FC<ActivationButtonProps> = (props) => {
  return (
    <>
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
        onClick={props.sendDataToServer}
      >
        {props.isLoading ? (
          <CircularProgress size={24} sx={{ color: "#15ffea" }} />
        ) : (
          "Start Scanning Your Profile For Violence"
        )}
      </Button>
    </>
  );
};

export default ActivationButton;
