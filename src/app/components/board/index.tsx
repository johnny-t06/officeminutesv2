import { IdentifiableQuestions } from "@interfaces/type";
import { Box } from "@mui/material";
import Question from "./Question";

interface BoardProps {
  questions: IdentifiableQuestions;
}

const Board = (props: BoardProps) => {
  const { questions } = props;

  if (questions.length === 0) {
    return (
      <Box
        paddingTop="200px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ color: "#625B71" }}
      >
        <p>No posts under this tag yet</p>
      </Box>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" rowGap="16px">
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </Box>
    );
  }
};

export default Board;
