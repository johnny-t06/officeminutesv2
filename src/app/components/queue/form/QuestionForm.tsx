import {
  Box,
  Button,
  Drawer,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { MultipleChoiceTags, SingleChoiceTags } from "./Tags";
import { TagOption } from "@interfaces/db";
import { createQuestion, defaultQuestion } from "api/question";
import { IdentifiableQuestion } from "@interfaces/type";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import Header from "@components/Header";
import { updateQuestion } from "@services/client/question";
import { CustomModal } from "@components/CustomModal";
import useApiThrottle from "@hooks/useApiThrottle";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";
import theme from "theme";
import OutlinedInput from "@mui/material/OutlinedInput";
import PublicIcon from "@mui/icons-material/Public";

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
  const { course } = useOfficeHour();
  const user = useUserOrRedirect();
  const TAG_ORDER = ["General", "Issue", "How do you feel about the topic"];

  if (!user) {
    return null;
  }

  const [newQuestion, setNewQuestion] =
    React.useState<IdentifiableQuestion>(currentQuestion);

  const defaultTags = () => {
    const curr_tags = currentQuestion.tags.map((t) => t.choice);
    let init: Record<string, TagOption[]> = {};
    TAG_ORDER.forEach((t) => {
      init[t] = course.tags[t].options.filter((o) =>
        curr_tags.includes(o.choice)
      );
    });
    return init;
  };
  const [questionTags, setQuestionTags] = React.useState<
    Record<string, TagOption[]>
  >(defaultTags());

  const [isErrorVisible, setIsErrorVisible] = React.useState<boolean>(false);
  const [errorFields, setErrorFields] = React.useState<{
    title: boolean;
    description: boolean;
    tags: boolean;
  }>({ title: false, description: false, tags: false });

  const updateQuestionTags = (tagsKey: string, newTags: TagOption[]) => {
    setQuestionTags({ ...questionTags, [tagsKey]: newTags });
  };

  const trigger = React.cloneElement(triggerButton, {
    onClick: () => {
      setOpenForm(true);
      setNewQuestion(currentQuestion);
      setQuestionTags(defaultTags());
      if (typeof triggerButton.props.onClick === "function") {
        triggerButton.props.onClick();
      }
    },
  });

  const resetForm = () => {
    setNewQuestion(defaultQuestion());
    setQuestionTags(defaultTags());
    setErrorFields({ title: false, description: false, tags: false });
  };

  const onSubmitForm = async () => {
    let tagsArr = Object.values(questionTags).reduce((arr, curr) => {
      return [...arr, ...curr];
    }, []);

    const tagsValidate = Object.keys(questionTags).filter(
      (k) => course.tags[k].required && questionTags[k].length === 0
    );
    const trimmedTitle = newQuestion.title.trim();
    const trimmedDescription = newQuestion.description.trim();
    if (
      trimmedTitle !== "" &&
      trimmedDescription !== "" &&
      tagsValidate.length === 0
    ) {
      if (title === "Join queue") {
        await createQuestion({
          ...newQuestion,
          title: trimmedTitle,
          description: trimmedDescription,
          tags: tagsArr,
          group: [user.id],
          courseId: course.id,
        });
      }
      if (title === "Edit submission") {
        await updateQuestion(
          {
            ...newQuestion,
            title: trimmedTitle,
            description: trimmedDescription,
            tags: tagsArr,
            group: [user.id],
          },
          course.id
        );
      }
      setOpenForm(false);
      resetForm();
    } else {
      setIsErrorVisible(true);
      setErrorFields({
        title: trimmedTitle === "",
        description: trimmedDescription === "",
        tags: tagsValidate.length > 0,
      });
    }
  };
  const { fetching, fn: throttledOnSubmit } = useApiThrottle({
    fn: onSubmitForm,
  });
  const ErrorModalButtons = [
    {
      text: "Ok",
      onClick: () => {
        setIsErrorVisible(false);
      },
    },
  ];

  const subtitle =
    !errorFields.title && !errorFields.description
      ? "Please select all tags"
      : "All required fields are not filled";

  return (
    <Box>
      {trigger}

      <Drawer open={openForm} anchor="bottom">
        <CustomModal
          title={"There was an error"}
          subtitle={subtitle}
          open={isErrorVisible}
          setOpen={setIsErrorVisible}
          buttons={ErrorModalButtons}
        />
        <Box height="100vh" width="100vw" overflow="scroll">
          <Header
            leftIcon={
              <IconButton
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
              >
                <CloseIcon />
              </IconButton>
            }
            title={title}
          />
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
              value={newQuestion.title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewQuestion({
                  ...newQuestion,
                  title: event.target.value,
                });
              }}
              error={errorFields.title}
              helperText={errorFields.title ? "Title is required" : ""}
            />

            <TextField
              required
              label="Description"
              placeholder="Add description"
              focused
              multiline
              rows={4}
              value={newQuestion.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewQuestion({
                  ...newQuestion,
                  description: event.target.value,
                });
              }}
              error={errorFields.description}
              helperText={
                errorFields.description ? "Description is required" : ""
              }
            />

            {TAG_ORDER.map((k) =>
              course.tags[k].multipleChoice ? (
                <MultipleChoiceTags
                  key={k}
                  tagsKey={k}
                  tags={course.tags[k]}
                  allQuestionTags={questionTags}
                  updateQuestionTags={updateQuestionTags}
                />
              ) : (
                <SingleChoiceTags
                  key={k}
                  tagsKey={k}
                  tags={course.tags[k]}
                  allQuestionTags={questionTags}
                  updateQuestionTags={updateQuestionTags}
                />
              )
            )}

            {/* TODO(johnnyt-06) - Optional Image Upload Section */}
            <FormControl>
              <FormLabel
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Optional
              </FormLabel>
              {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "#D3E4FF",
                  boxShadow: "none",
                  color: theme.palette.text.primary,
                  textTransform: "none",
                  borderRadius: 50,
                  width: 170,
                  marginTop: 2,
                  marginBottom: 2,
                  paddingY: "10px",
                  gap: 1,
                }}
              >
                <FileUploadOutlinedIcon />
                <Typography noWrap>Upload image</Typography>
              </Button> */}
              <FormControl>
                <Select
                  variant="standard"
                  disableUnderline
                  displayEmpty
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                      {
                        border: 0,
                      },
                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        border: 0,
                      },
                  }}
                  value={newQuestion.questionPublic ? 0 : 1}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setNewQuestion({
                      ...newQuestion,
                      questionPublic: value === 0,
                    });
                  }}
                  input={<OutlinedInput />}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <PublicIcon sx={{ color: "#38608F" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.4,
                        }}
                      >
                        <Typography variant="body1">
                          Public Question (Default)
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ textWrap: "wrap", lineHeight: 1.4 }}
                        >
                          Everyone can view and join this question. You can join
                          multiple public questions.
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem value={1}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <LockOutlinedIcon sx={{ color: "#38608F" }} />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.4,
                        }}
                      >
                        <Typography variant="body1">
                          Private Question
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          sx={{ textWrap: "wrap", lineHeight: 1.4 }}
                        >
                          Only you and the TA can view this question.
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </FormControl>
          </Box>

          {/* TODO(lnguye2693) - Flag so each student only has 1 submission */}
          <Box right={0} left={0} bottom={0} padding={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ textTransform: "initial", borderRadius: 5 }}
              onClick={throttledOnSubmit}
              disabled={fetching}
            >
              {title === "Join queue" ? "Join now" : "Edit submission"}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default QuestionForm;
