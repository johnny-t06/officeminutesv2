import { Box, Button } from "@mui/material";
import QuestionForm from "./form/QuestionForm";
import { defaultQuestion } from "@utils/index";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const CreateQuestion = () => {
  const triggerButton = (
    <Button
      variant="contained"
      color="primary"
      sx={{
        textTransform: "initial",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1.5,
        paddingTop: 1.5,
        paddingBottom: 1.5,
        paddingRight: 2.5,
        paddingLeft: 2.5,
        borderRadius: 4,
        position: "fixed",
        bottom: 70,
        right: 15,
        zIndex: 99,
      }}
      onClick={() => {console.log("abc")}}
    >
      <ArrowForwardOutlinedIcon />
      <Box
        fontWeight={500}
        fontSize={16}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Join queue
      </Box>
    </Button>
  );
  return (
    <Box>
      <QuestionForm
        triggerButton={triggerButton}
        title="Join queue"
        currentQuestion={defaultQuestion()}
      ></QuestionForm>
    </Box>
  );
};

export default CreateQuestion;
