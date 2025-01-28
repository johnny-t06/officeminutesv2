import { QuestionDetails } from "@components/board/QuestionDetails";
import TaCard from "@components/tas/TaCard";
import {
  IdentifiableCourse,
  IdentifiableQuestion,
  IdentifiableUser,
} from "@interfaces/type";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import { Box } from "@mui/material";

interface studentHelpingProps {
  currQuestion: IdentifiableQuestion;
  course: IdentifiableCourse;
  ta: IdentifiableUser;
}

export const StudentHelping = (props: studentHelpingProps) => {
  const { currQuestion, course, ta } = props;

  return (
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
          bgcolor: "#D7E3F8",
          justifyContent: "center",
          marginLeft: "-16px",
          marginTop: "-18px",
          width: "100vw",
        }}
      >
        <NotificationAddOutlinedIcon style={{ fontSize: "20px" }} />
        <Box fontWeight={500} fontSize="14px">
          It's your turn
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
        Your TA
      </Box>
      <Box sx={{ paddingLeft: "10px" }}>
        <TaCard ta={ta!} />
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
      <QuestionDetails
        question={currQuestion}
        courseId={course.id}
        fromStudentCurrentHelping
      />
    </Box>
  );
};

