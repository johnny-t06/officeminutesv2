"use client";
import Header from "@components/Header";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import theme from "theme";
import { addFeedback } from "@services/client/feedback";
import { Timestamp } from "firebase/firestore";

const Page = () => {
  const router = useRouter();

  const formControlLabelStyles = {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
  };

  const [recommendation, setRecommendation] = React.useState<number | null>(
    null
  );
  const [feedback, setFeedback] = React.useState<string>("");
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleRecommendChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecommendation(parseInt(event.target.value, 10));
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(event.target.value);
  };

  const handleSendFeedback = async () => {
    if (recommendation === null) {
      return;
    }

    try {
      await addFeedback({
        recommendation,
        feedback,
        timestamp: Timestamp.fromDate(new Date()),
      });

      setFeedbackSubmitted(true);
    } catch (e) {
      setError(
        "An error occurred while submitting your feedback. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col">
      <Header
        leftIcon={
          <IconButton onClick={router.back} edge="start">
            <ArrowBackIcon />
          </IconButton>
        }
        title="Send Feedback"
      />
      {feedbackSubmitted ? (
        <div className="flex flex-col min-h-[calc(100vh-56px)] items-center text-[#49454F] justify-center">
          <div>Your feedback is submitted!</div>
          <div>Thank you for your feedback.</div>
        </div>
      ) : (
        <>
          <Typography sx={{ marginBlock: "12px", fontWeight: 500 }}>
            How likely are you to recommend OfficeMinutes to a friend?
          </Typography>
          <FormControl
            component="fieldset"
            sx={{ width: "100%", paddingInline: "16px" }}
          >
            <RadioGroup value={recommendation} onChange={handleRecommendChange}>
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Very unlikely"
                sx={formControlLabelStyles}
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Unlikely"
                sx={formControlLabelStyles}
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Neutral"
                sx={formControlLabelStyles}
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Likely"
                sx={formControlLabelStyles}
              />
              <FormControlLabel
                value={5}
                control={<Radio />}
                label="Very likely"
                sx={formControlLabelStyles}
              />
            </RadioGroup>
          </FormControl>
          <Typography sx={{ marginBlock: "12px", fontWeight: 500 }}>
            How can we improve OfficeMinutes for you?
          </Typography>
          <TextField
            label="Feedback"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={feedback}
            onChange={handleFeedbackChange}
          />
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              textTransform: "none",
              borderRadius: "100px",
              marginTop: "16px",
              paddingInline: "24px",
              paddingBlock: "10px",
              fontWeight: 550,
              alignSelf: "center",
              "&.Mui-disabled": {
                backgroundColor: theme.palette.action.disabledBackground,
                color: theme.palette.text.disabled,
              },
            }}
            onClick={handleSendFeedback}
            disabled={recommendation === null}
          >
            Send feedback
          </Button>
          {error !== "" ? (
            <div className="text-red text-center mt-2 text-sm">{error}</div>
          ) : null}
        </>
      )}
    </div>
  );
};
export default Page;