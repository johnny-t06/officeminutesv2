import { IdentifiableQuestion } from "@interfaces/type";
import { Box, Button } from "@mui/material";
import React from "react";

interface QuestionProps {
  question: IdentifiableQuestion;
}

const Question = (props: QuestionProps) => {
  const { question } = props;
  return (
    <Box sx={{ backgroundColor: "#F2F3FA" }} padding="16px" borderRadius="8px">
      <Box height="48px">
        <p
          style={{
            color: "#191C20",
            fontSize: "24px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {question.group[0] ?? ""}
        </p>
      </Box>
      <Box marginTop="16px" fontWeight={400}>
        <h2
          style={{
            fontSize: "24px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            color: "#191C20",
          }}
        >
          {question.title}
        </h2>
        <p
          style={{
            marginTop: "8px",
            color: "#43474E",
          }}
        >
          {question.description}
        </p>
      </Box>
      <Box marginTop="32px">
        <Box display="flex" columnGap="16px" rowGap="8px" flexWrap="wrap">
          {question.tags.map((tag) => (
            <Box
              key={tag}
              border={1}
              borderColor="#73777F"
              borderRadius="8px"
              paddingY="6px"
              paddingX="16px"
              color="#43474E"
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>
      <Box marginTop="16px" display="flex" justifyContent="flex-end">
        <Button
          sx={{
            paddingY: "10px",
            paddingX: "24px",
            bgcolor: "#38608F",
            borderRadius: "32px",
            color: "#fff",
          }}
        >
          Join Group
        </Button>
      </Box>
    </Box>
  );
};

export default Question;
