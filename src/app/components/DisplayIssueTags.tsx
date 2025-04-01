import React, { useCallback, useState, useEffect } from "react";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { getCourseTopicTags } from "@utils/index";
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import theme from "theme";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { addCourseTag, deleteCourseTag } from "@services/client/course";
import useApiThrottle from "@hooks/useApiThrottle";

interface DisplayIssueTagsProps {}

const TAG_KEY = "Tags";

export const DisplayIssueTags = (props: DisplayIssueTagsProps) => {
  const { course } = useOfficeHour();
  const topics = getCourseTopicTags(course.tags[TAG_KEY].options);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTag, setLoadingTag] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  useEffect(() => {
    if (error) setError("");
  }, [currentTag]);

  const showNotification = useCallback(
    (message: string, severity: "success" | "error" | "info" | "warning") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setShowSnackbar(true);
    },
    []
  );

  const handleCloseSnackbar = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  const submitTag = useCallback(async () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag === "") return;

    if (topics.includes(trimmedTag)) {
      setError("This tag already exists");
      return;
    }

    try {
      setIsLoading(true);
      await addCourseTag(course.id, trimmedTag);
      setCurrentTag("");
      showNotification("Tag added successfully", "success");
    } catch (err) {
      console.error("Error adding tag:", err);
      showNotification("Failed to add tag", "error");
    } finally {
      setIsLoading(false);
    }
  }, [currentTag, course.id, topics, showNotification]);

  const { fetching, fn: throttledSubmitTag } = useApiThrottle({
    fn: submitTag,
  });

  const handleKeyPress = useCallback(
    async (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && !fetching) {
        await throttledSubmitTag();
      }
    },
    [throttledSubmitTag, fetching]
  );

  const handleDeleteTag = useCallback(
    async (tag: string) => {
      try {
        setLoadingTag(tag);
        await deleteCourseTag(course.id, tag);
        showNotification("Tag deleted successfully", "success");
      } catch (err) {
        console.error("Error deleting tag:", err);
        showNotification("Failed to delete tag", "error");
      } finally {
        setLoadingTag("");
      }
    },
    [course.id, showNotification]
  );

  return (
    <Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          Tags
        </Typography>
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => setIsEdit(!isEdit)}
          disabled={isLoading}
        >
          <Typography color={"#38608F"} variant="subtitle2">
            {isEdit ? "Done" : "Edit"}
          </Typography>
        </Button>
      </Box>
      {isEdit ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Add a new tag"
            placeholder="Press enter after entering a tag"
            focused
            fullWidth
            value={currentTag}
            error={!!error}
            helperText={error}
            disabled={isLoading || fetching}
            sx={{
              "& .MuiInputBase-root": {
                paddingY: "12px",
              },
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCurrentTag(event.target.value);
            }}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment:
                isLoading || fetching ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton
                    onClick={() => throttledSubmitTag()}
                    disabled={isLoading || fetching}
                    size="small"
                  >
                    <AddIcon fontSize="small" sx={{ color: "#38608F" }} />
                  </IconButton>
                ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            {topics.map((topic) => (
              <Box
                key={topic}
                sx={{
                  borderRadius: "8px",
                  borderColor: "#73777F",
                  paddingLeft: "16px",
                  paddingRight: topic === "Other" ? "16px" : "",
                  backgroundColor: "#F7F2FA",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "36px",
                }}
              >
                <Typography color="#43474E" variant="subtitle2">
                  {topic}
                </Typography>
                {topic !== "Other" && (
                  <IconButton
                    onClick={() => handleDeleteTag(topic)}
                    disabled={isLoading || loadingTag === topic}
                  >
                    {loadingTag === topic ? (
                      <CircularProgress size={16} sx={{ color: "#43474E" }} />
                    ) : (
                      <CloseIcon fontSize="small" sx={{ color: "#43474E" }} />
                    )}
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {topics.map((topic) => (
            <Chip
              key={topic}
              sx={{
                borderRadius: "8px",
                padding: "6px",
                borderColor: "#73777F",
              }}
              variant="outlined"
              label={topic}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
