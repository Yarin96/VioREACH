import { Typography, Grid } from "@mui/material";

interface resultsProps {
  result: number[];
}

const ResultsPage: React.FC<resultsProps> = (props) => {
  return (
    <>
      <Grid
        container
        sx={{
          border: "1px solid #000000",
          padding: "10px",
          justifyContent: "center",
          marginBottom: "56px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={3}>
          <Typography
            fontWeight="bold"
            variant="h5"
            style={{
              marginTop: "36px",
              textDecoration: "underline",
            }}
            fontFamily={"'Rubik', sans-serif"}
          >
            Results:
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          {props.result[props.result.length - 1] === 1 ? (
            <Typography
              fontWeight="bold"
              variant="h6"
              style={{
                marginTop: "16px",
                marginBottom: "36px",
                color: "red",
              }}
              fontFamily={"'Rubik', sans-serif"}
            >
              Violence Detected!
            </Typography>
          ) : (
            <Typography
              fontWeight="bold"
              variant="h6"
              style={{
                marginTop: "16px",
                marginBottom: "36px",
                color: "green",
              }}
              fontFamily={"'Rubik', sans-serif"}
            >
              Everything is fine - your child is safe!
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ResultsPage;
