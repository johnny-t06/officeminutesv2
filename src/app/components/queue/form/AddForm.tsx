import Header from "@components/Header";
import { IdentifiableQuestion } from "@interfaces/type";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import useApiThrottle from "@hooks/useApiThrottle";
import { updateQuestion } from "@services/client/question";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";

interface AddFormProps {
  triggerButton: JSX.Element;
  currentQuestion: IdentifiableQuestion;
}

const AddForm = (props: AddFormProps) => {
  const { currentQuestion, triggerButton } = props;

  const { course } = useOfficeHour();

  const [openForm, setOpenForm] = React.useState(false);
  const [newDescription, setNewDescription] = React.useState("");
  const [localDescription, setLocalDescription] = React.useState("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!openForm) {
      setLocalDescription(currentQuestion.description);
    }
  }, [currentQuestion.description, openForm]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: () => {
      setOpenForm(true);
      if (typeof triggerButton.props.onClick === "function") {
        triggerButton.props.onClick();
      }
    },
  });

  const onSubmitForm = async () => {
    const trimmedDescription = newDescription.trim();

    if (trimmedDescription !== "") {
      const combinedDescription = currentQuestion.description
        ? `${currentQuestion.description}\n${newDescription}`
        : newDescription;

      await updateQuestion(
        { ...currentQuestion, description: combinedDescription },
        course.id
      );
      setOpenForm(false);
      resetForm();
    } else {
      setError(true);
    }
  };

  const resetForm = () => {
    setNewDescription("");
    setError(false);
  };

  const { fetching, fn: throttledOnSubmit } = useApiThrottle({
    fn: onSubmitForm,
  });

  return (
    <Box>
      {trigger}
      <Drawer open={openForm} anchor="bottom">
        <Box height="100vh" width="100vw" overflow="scroll">
          <Header
            leftIcon={
              <IconButton
                onClick={() => {
                  setOpenForm(false);
                  resetForm();
                }}
                title={"Add to submission"}
              >
                <CloseIcon />
              </IconButton>
            }
            title={"Add to submission"}
          />
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            paddingTop={1}
          >
            <Box
              sx={{
                backgroundColor: "#F2F3FA",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <Typography variant="body1" style={{ marginBottom: "8px" }}>
                {currentQuestion.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  color: "#43474E",
                }}
              >
                {localDescription &&
                  localDescription.split("\n").map((line, index, arr) => (
                    <React.Fragment key={index}>
                      {index === 0 ? (
                        line
                      ) : (
                        <>
                          {line}
                          <span style={{ color: "#8E8E93" }}>
                            {" "}
                            (message added)
                          </span>
                        </>
                      )}
                      {index !== arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </Typography>
            </Box>
            <TextField
              label="Description"
              focused
              multiline
              rows={4}
              sx={{ marginInline: "6px" }}
              value={newDescription}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewDescription(event.target.value);
                setError(false);
              }}
              error={error}
              helperText={error ? "Description is required" : ""}
            />
          </Box>
          <Box right={0} left={0} bottom={0} padding={2}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ textTransform: "initial", borderRadius: 5 }}
              onClick={throttledOnSubmit}
              disabled={fetching}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AddForm;
