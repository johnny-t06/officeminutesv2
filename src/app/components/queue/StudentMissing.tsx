import { QuestionDetails } from "@components/QuestionDetails";
import { IdentifiableQuestion } from "@interfaces/type";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box } from "@mui/material";

interface StudentMissingProps {
  currQuestion: IdentifiableQuestion;
}

export const StudentMissing = (props: StudentMissingProps) => {
  const { currQuestion } = props;

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
          You were marked as missing. Notify your TA.
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
      </Box>
    </Box>
  );
};
