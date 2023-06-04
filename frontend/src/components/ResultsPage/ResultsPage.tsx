import { Typography, Grid } from "@mui/material";

interface resultsProps {
  result: number[];
}

const ResultsPage: React.FC<resultsProps> = (props) => {
  const detections: string[] = ["Crowdedness", "Fast Moves", "Blood Presence"];
  const levelsOfViolence: string[] = [
    "Low level of violence detected!",
    "Medium level of violence detected!",
    "High level of violence detected!",
  ];

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
          {props.result[props.result.length - 1] !== 0 ? (
            <>
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
              <ul>
                {props.result.map((value, index) => {
                  if (index === props.result.length - 1) {
                    const violenceLevel = levelsOfViolence[value - 1];
                    return <li key={index}>{violenceLevel}</li>;
                  } else if (value === 1) {
                    const detectionText = `Detected ${detections[index]}.`;
                    return <li key={index}>{detectionText}</li>;
                  }
                  return null;
                })}
              </ul>
            </>
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
