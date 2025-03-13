import { QuestionDetails } from "@components/QuestionDetails";
import { IdentifiableQuestion } from "@interfaces/type";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { Box, Button } from "@mui/material";
import { leaveQuestionGroup } from "@services/client/question";
import React from "react";

interface StudentMissingProps {
  currQuestion: IdentifiableQuestion;
  courseId: string;
  userId: string;
}

export const StudentMissing = (props: StudentMissingProps) => {
  const { currQuestion, courseId, userId } = props;

  const leaveQueue = async () => {
    await leaveQuestionGroup(currQuestion, courseId, userId);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          color: "#43474E",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "10px",
            padding: "16px",
            bgcolor: "#FFDAD6",
            justifyContent: "center",
            marginLeft: "-16px",
            marginTop: "-18px",
            width: "100vw",
          }}
        >
          <ErrorOutlineOutlinedIcon
            style={{ fontSize: "20px", color: "#FF0000" }}
          />
          <Box fontWeight={500} fontSize="14px">
            {currQuestion.questionPublic ? "Your group was" : "You were"} marked
            as missing. Notify your TA.
          </Box>
        </Box>

        <Box
          sx={{
            paddingTop: "20px",
            paddingRight: "10px",
            paddingLeft: "10px",
            fontWeight: 700,
            color: "#545F70",
            fontSize: "18.98px",
          }}
        >
          Your Question
        </Box>
        <Box
          sx={{
            backgroundColor: "#F2F3FA",
            padding: "24px",
            borderRadius: "24px",
          }}
        >
          <QuestionDetails question={currQuestion} showGroup />

          <Button
            variant="contained"
            sx={{
              fontWeight: 500,
              fontSize: 14,
              textTransform: "initial",
              borderRadius: "100px",
              display: "flex",
              flexDirection: "row",
              boxShadow: "none",
              marginTop: "24px",
              height: "40px",
            }}
            fullWidth
            onClick={leaveQueue}
            aria-label={
              currQuestion.questionPublic ? "Leave group" : "Leave queue"
            }
          >
            <KeyboardReturnOutlinedIcon
              style={{ fontSize: "16px", marginRight: "8px" }}
            />
            {currQuestion.questionPublic ? "Leave group" : "Leave queue"}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};
