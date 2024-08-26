import { Box, Button, Drawer, TextField } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import React from "react";
import { green } from "@mui/material/colors";
import { officeHourContext } from "@context/OfficeHourContext";
import { MultipleChoiceTags, SingleChoiceTags } from "./Tags";
import { TagOption } from "@interfaces/db";

interface QuestionFormProps {
  // triggerButton -> then use React.cloneElement
  triggerButton: JSX.Element;
  title: string;
  // current state of question
}

const QuestionForm = (props: QuestionFormProps) => {
  const { triggerButton, title } = props;
  const [openForm, setOpenForm] = React.useState(false);
  const ohContext = React.useContext(officeHourContext);

  const [question, setQuestion] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [questionTags, setQuestionTags] = React.useState<
    Record<string, TagOption[]>
  >({});

  const updateQuestionTags = (tagsKey: string, newTags: TagOption[]) => {
    // const curr = questionTags;
    // curr[tagsKey] = newTags;
    setQuestionTags({ ...questionTags, [tagsKey]: newTags });
    console.log(questionTags);
  };

  const trigger = React.cloneElement(triggerButton, {
    onClick: () => {
      setOpenForm(true);
      console.log("clicked");
    },
  });
  return (
    <Box>
      {trigger}
      <Drawer
        open={openForm}
        anchor="bottom"
        // onClose={() => {
        //   setOpenForm(false);
        // }}
      >
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
            padding={2}
            // sx={{ backgroundColor: green[50] }}
          >
            <TextField
              label="Question"
              placeholder="Give your question a title"
              focused
              value={question}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuestion(event.target.value)
              }}
            ></TextField>

            <TextField
              label="Description"
              placeholder="Add description"
              focused
              multiline
              rows={4}
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value)
              }}
            ></TextField>

            {Object.keys(ohContext.course.tags).map((k) =>
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
          </Box>
          <Box right={0} left={0} bottom={0} padding={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ textTransform: "initial", borderRadius: 5 }}
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
