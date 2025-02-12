import { QuestionDetails } from "@components/QuestionDetails";
import TaCard from "@components/tas/TaCard";
import { IdentifiableQuestion, IdentifiableUser } from "@interfaces/type";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import { Box } from "@mui/material";

interface StudentHelpingProps {
  currQuestion: IdentifiableQuestion;
  ta: IdentifiableUser;
}

export const StudentHelping = (props: StudentHelpingProps) => {
  const { currQuestion, ta } = props;

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
      <Box sx={{ paddingLeft: "8px" }}>
        <TaCard ta={ta} />
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
      </Box>
    </Box>
  );
};
