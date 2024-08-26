import { Box, Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import QuestionForm from "./form/QuestionForm";

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
        borderRadius: 3.5,
        position: "fixed",
        bottom: 70,
        right: 15,
        zIndex: 99,
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <FaArrowRight />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        Join queue
      </Box>
    </Button>
  );
  return (
    <Box>
      <QuestionForm
        triggerButton={triggerButton}
        title="Join queue"
      ></QuestionForm>
    </Box>
  );
};

export default CreateQuestion;
