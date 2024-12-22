import { IdentifiableQuestion } from "@interfaces/type";
import { Box, Button, Typography } from "@mui/material";
import { formatTimeDifference, trimName } from "@utils/index";
import React from "react";

interface QuestionProps {
  question: IdentifiableQuestion;
}

const Question = (props: QuestionProps) => {
  const { question } = props;
  return (
    <Box sx={{ backgroundColor: "#F2F3FA" }} padding="16px" borderRadius="8px">
      <Box height="48px">
        <Typography
          variant="h6"
          style={{
            color: "#191C20",
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontWeight: 600,
          }}
        >
          {trimName(question.group[0]) ?? ""}
        </Typography>
        <Typography
          style={{
            marginTop: "8px",
            color: "#43474E",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {formatTimeDifference(question.timestamp)}
        </Typography>
      </Box>

      <Box marginTop="16px" fontWeight={400}>
        <Typography
          variant="h6"
          style={{
            color: "#191C20",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {question.title}
        </Typography>
        <Typography
          style={{
            marginTop: "8px",
            color: "#43474E",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {question.description}
        </Typography>
      </Box>
      <Box marginTop="32px">
        <Box display="flex" columnGap="16px" rowGap="8px" flexWrap="wrap">
          {question.tags.map((tag) => (
            <Box
              key={tag.toString()}
              border={1}
              borderColor="#73777F"
              borderRadius="10px"
              paddingY="4px"
              paddingX="12px"
              color="#43474E"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {" "}
                {tag.toString()}
              </Typography>
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
