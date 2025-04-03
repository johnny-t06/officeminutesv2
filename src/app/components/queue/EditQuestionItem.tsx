"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { IdentifiableQuestion, IdentifiableUsers } from "@interfaces/type";
import { getUsers } from "@services/client/user";
import { trimUserName } from "@utils/index";
import AddForm from "./form/AddForm";

interface EditQuestionItemProps {
  position: number;
  question: IdentifiableQuestion;
  leaveQueue: (modal?: boolean) => void;
}

export const EditQuestionItem = (props: EditQuestionItemProps) => {
  const { position, question, leaveQueue } = props;
  const [users, setUsers] = React.useState<IdentifiableUsers>([]);
  const isPrivate = !question.questionPublic;

  React.useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers(question.group);
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, [question.group]);

  return (
    <Container
      sx={{
        bgcolor: "primary.light",
        paddingY: "16px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        rowGap: "12px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          rowGap: "10px",
          padding: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "12px",
              color: "#545F70",
              marginTop: "10px",
            }}
          >
            {isPrivate ? "Private question" : "Your queue position"}
          </Typography>
          <Typography
            sx={{ fontWeight: 700, fontSize: "45px", textAlign: "center" }}
          >
            {position + 1}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            rowGap: "10px",
            width: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              fontWeight: 500,
              fontSize: 12,
              textTransform: "initial",
              borderRadius: "100px",
              display: "flex",
              flexDirection: "row",
              boxShadow: "none",
            }}
            fullWidth
            onClick={() => leaveQueue(true)}
            aria-label={isPrivate ? "Leave queue" : "Leave group"}
          >
            <KeyboardReturnOutlinedIcon
              style={{ fontSize: "14px", marginRight: "8px" }}
            />
            {isPrivate ? "Leave queue " : "Leave group"}
          </Button>
          <AddForm
            triggerButton={
              <Button
                sx={{
                  fontWeight: 500,
                  fontSize: 12,
                  textTransform: "initial",
                  borderRadius: "100px",
                }}
                fullWidth
                variant="outlined"
                aria-label="Add to submission"
              >
                Add to submission
              </Button>
            }
            currentQuestion={question}
          />
        </Box>
      </Container>
      <Divider flexItem />
      <Accordion
        disableGutters
        sx={{
          width: 1,
          boxShadow: "none",
          paddingX: "4px",
          backgroundColor: "transparent",
          "&.MuiAccordion-root": {
            "&:before": {
              display: "none",
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownIcon sx={{ color: "#38608F" }} />}
          sx={{
            padding: 0,
            marginBottom: 0,
          }}
          aria-controls={`question-${question.id}-content`}
          id={`question-${question.id}-header`}
        >
          <Typography sx={{ fontSize: "16px", color: "#191C20" }}>
            {question.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: "0 0 8px 0" }}
          id={`question-${question.id}-content`}
          aria-labelledby={`question-${question.id}-header`}
        >
          {question.description.map((description, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: "14px",
                color: "#43474E",
                marginTop: index !== 0 ? "8px" : "0px",
              }}
            >
              {description.text}
            </Typography>
          ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              maxWidth: 0.6,
              flexWrap: "wrap",
              marginLeft: "auto",
            }}
          >
            <Typography
              sx={{ fontSize: 12, color: "#545F70", textAlign: "right" }}
            >
              {trimUserName(users[0])}
              {users.length > 1 && (
                <span>
                  {" "}
                  <strong>+ {users.length - 1}</strong> other(s)
                </span>
              )}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
