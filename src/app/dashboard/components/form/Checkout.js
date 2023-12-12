"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import AppContext from "../../../../contexts/AppContext";
import axios from "axios";
const steps = ["Source", "Funtion", "Lead Details", "Cover Letter"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [coverLetter, setCoverLetter] = React.useState("");
  const { data, ProjectDescription } = React.useContext(AppContext);

  const handleNext = () => {
    console.log("next");
    setActiveStep(activeStep + 1);
  };
  const handlePostRequest = async () => {
    handleNext();
    try {
      const urlLead = "http://localhost:3000/api/zohoapi";
      const urlCoverLetter = "http://localhost:3000/api/coverletter";

      const Leadresponse = await axios.post(urlLead, { data });
      const coverLetterResponse = await axios.post(urlCoverLetter, {
        ProjectDescription,
      });
      if (coverLetterResponse.status === 200) {
        setCoverLetter(coverLetterResponse.data.message);
        console.log(coverLetterResponse.data);
      }
      console.log(Leadresponse.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  console.log(activeStep);
  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length - 1 ? (
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {coverLetter === "" ? (
                  <>
                    <CircularProgress />
                    <Typography variant="subtitle1">
                      Your Cover Letter will be here soon!
                    </Typography>
                  </>
                ) : (
                  <p>{coverLetter}</p>
                )}
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 2
                      ? handlePostRequest
                      : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 2
                    ? "Generate Cover Letter "
                    : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
