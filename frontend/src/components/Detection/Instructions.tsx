import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const steps = [
  {
    label: "Grant Access to Instagram account",
    description: `First, you'd be asked to grant access to your Instagram account so we could access your personal media.
    A pop-up window will appear with Instagram Account Authorization request. 
    Kindly log-in to your account and click "Allow".`,
  },
  {
    label: "Disable 'Bad URL' warnings",
    description:
      "As Instagram verifies your credentials, you might encounter browser warnings regarding bad URL as security vulnerability, please ignore them and accept permissions.",
  },
  {
    label: "Auth Succeeded!",
    description: `You should be able to see a 'Authentication Succeeded' message. 
    Close the pop-up window, and a 'Extract Posts' button should be visible. 
    Click it in order to start scanning your account posts.`,
  },
  {
    label: "Activate Algorithm",
    description: `After the posts were extracted, you should be able to see the user's uploads history stats. A new button will be shown to start the detection process.`,
  },
];

export default function Instructions(props: any) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Divider />
      <Typography
        variant="body1"
        style={{ marginTop: "16px", fontSize: "24px", fontWeight: "bold" }}
      >
        - Instructions - <br />
        <ArrowDownwardIcon />
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          height: "400px",
          mx: "auto",
          mt: "1rem",
          bgcolor: "#ffffff",
          padding: "32px",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper
            square
            elevation={0}
            sx={{
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "8px",
              p: 3,
            }}
          >
            <Typography>We are all set! 👌</Typography>
            <Button
              variant="contained"
              onClick={props.onAccessClick}
              sx={{ mt: 1, mr: 1 }}
            >
              Permit Instagram Access
            </Button>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset Instructions
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}
