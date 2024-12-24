import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { officeHourContext } from "@context/OfficeHourContext";
import { MultipleChoiceTags, SingleChoiceTags } from "./Tags";
import { TagOption } from "@interfaces/db";
import { createQuestion } from "@utils/index";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { UserSessionContext } from "@context/UserSessionContext";
import { IdentifiableQuestion } from "@interfaces/type";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

interface QuestionFormProps {
  // button to open the form
  triggerButton: JSX.Element;
  title: string;
  // current state of question
  currentQuestion: IdentifiableQuestion;
}

const QuestionForm = (props: QuestionFormProps) => {
  const { triggerButton, title, currentQuestion } = props;
  const [openForm, setOpenForm] = React.useState(false);
  const ohContext = React.useContext(officeHourContext);
  const userSessionContext = React.useContext(UserSessionContext);

  const [question, setQuestion] = React.useState(currentQuestion.title);
  const [description, setDescription] = React.useState(
    currentQuestion.description
  );
  const [questionPublic, setQuestionPublic] = React.useState(
    currentQuestion.questionPublic
  );

  const [questionTags, setQuestionTags] = React.useState<
    Record<string, TagOption[]>
  >(() => {
    const curr_tags = currentQuestion.tags.map((t) => t.choice);
    let init: Record<string, TagOption[]> = {};
    Object.keys(ohContext.course.tags).forEach((t) => {
      init[t] = ohContext.course.tags[t].options.filter((o) =>
        curr_tags.includes(o.choice)
      );
    });
    return init;
  });

  const updateQuestionTags = (tagsKey: string, newTags: TagOption[]) => {
    setQuestionTags({ ...questionTags, [tagsKey]: newTags });
  };

  const trigger = React.cloneElement(triggerButton, {
    onClick: () => {
      setOpenForm(true);
      if (typeof triggerButton.props.onClick === 'function') {
        triggerButton.props.onClick();
      }
    },
  });

  const joinQueue = () => {
    const timestamp = Timestamp.now();
    const author = userSessionContext.user?.tufts_username;

    let tagsArr = Object.values(questionTags).reduce((arr, curr) => {
      return [...arr, ...curr];
    }, []);

    const tagsValidate = Object.keys(questionTags).filter(
      (k) => ohContext.course.tags[k].required && questionTags[k].length === 0
    );

    if (question !== "" && description !== "" && tagsValidate.length === 0) {
      if (title === "Join queue") {
        createQuestion(
          question,
          description,
          questionPublic,
          timestamp,
          author ? [author] : [],
          tagsArr,
          ohContext.course.id
        );
      }
      // if title === edit submission
    } else {
      console.log("Required fields not filled");
      // TODO(lnguye2693) - Display error
    }

    setOpenForm(false);
  };
  return (
    <Box>
      {trigger}
      <Drawer open={openForm} anchor="bottom">
        <Box height="100vh" width="100vw" overflow="scroll">
          <Box display="flex" alignItems="center" padding={1.5} gap={1}>
            <button
              onClick={() => {
                setOpenForm(false);
              }}
              style={{
                background: "transparent",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: 1,
              }}
            >
              <IoMdClose size={20} />
            </button>
            <Box>{title}</Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            padding={3.5}
            paddingTop={1}
          >
            <TextField
              required
              label="Question"
              placeholder="Give your question a title"
              focused
              value={question}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuestion(event.target.value);
              }}
            ></TextField>

            <TextField
              required
              label="Description"
              placeholder="Add description"
              focused
              multiline
              rows={4}
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
            />

            {/* TODO(lnguyen2693) - Add index for tags, sort and display them 
            in an order */}
            {Object.keys(ohContext.course.tags)
              .sort(
                (a, b) =>
                  ohContext.course.tags[a].priority -
                  ohContext.course.tags[b].priority
              )
              .map((k) =>
                ohContext.course.tags[k].multipleChoice ? (
                  <MultipleChoiceTags
                    key={k}
                    tagsKey={k}
                    tags={ohContext.course.tags[k]}
                    allQuestionTags={questionTags}
                    updateQuestionTags={updateQuestionTags}
                  ></MultipleChoiceTags>
                ) : (
                  <SingleChoiceTags
                    key={k}
                    tagsKey={k}
                    tags={ohContext.course.tags[k]}
                    allQuestionTags={questionTags}
                    updateQuestionTags={updateQuestionTags}
                  ></SingleChoiceTags>
                )
              )}

            <FormControl sx={{ marginTop: 0.5 }}>
              <FormLabel>Optional</FormLabel>
              <Button
                style={{
                  backgroundColor: "#D3E4FF",
                }}
                variant="contained"
                sx={{
                  color: "text.primary",
                  textTransform: "none",
                  borderRadius: 50,
                  width: 170,
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
                <Box sx={{ margin: 0.5, marginLeft: 1.5 }}>Upload image</Box>
              </Button>
              <FormControlLabel
                sx={{ marginLeft: 2, marginTop: 0.5 }}
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setQuestionPublic(event.target.checked)
                    }
                    checked={questionPublic}
                  />
                }
                label={
                  <Box sx={{ paddingLeft: 2.5, paddingTop: 1 }}>
                    <Box fontSize={16}>Post to board</Box>
                    <Box fontSize={14}>
                      Posting to the board will allow a maximum of 4 other
                      people to join your TA session.
                    </Box>
                  </Box>
                }
              ></FormControlLabel>
            </FormControl>
          </Box>

          <Box right={0} left={0} bottom={0} padding={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ textTransform: "initial", borderRadius: 5 }}
              onClick={joinQueue}
            >
              Join now
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default QuestionForm;
