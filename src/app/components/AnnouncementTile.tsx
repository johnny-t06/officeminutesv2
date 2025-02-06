import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import theme from "theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React from "react";
import {
  addCourseAnnouncement,
  deleteCourseAnnouncement,
  editCourseAnnouncement,
} from "@services/client/course";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Announcement } from "@interfaces/db";
import { CustomModal } from "./CustomModal";
import UndoIcon from "@mui/icons-material/Undo";
import { RoundedTile } from "./RoundedTile";
interface AnnouncementTileProps {
  announcement: Announcement;
  isEdit: boolean;
  startEdit?: boolean;
  onCreateUndo?: () => void;
}

export const AnnouncementTile = (props: AnnouncementTileProps) => {
  const { announcement, isEdit, startEdit = false, onCreateUndo } = props;
  const { course } = useOfficeHour();

  const [editing, setEditing] = React.useState<boolean>(false);
  const [newMessage, setNewMessage] = React.useState<string>(
    announcement.message
  );
  const [deleteVisible, setDeleteVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    if (!isEdit) {
      setNewMessage(announcement.message);
      setEditing(false);
    }
  }, [isEdit]);

  const onSave = async () => {
    if (newMessage.trim() === "") {
      setError("Announcement cannot be empty");
      return;
    }
    if (newMessage.trim() !== announcement.message) {
      if (announcement.message === "") {
        await addCourseAnnouncement(course.id, {
          ...announcement,
          message: newMessage.trim(),
        });
      } else {
        await editCourseAnnouncement(course.id, announcement, {
          ...announcement,
          message: newMessage.trim(),
        });
      }
    }
    setEditing(false);
  };

  const onDelete = async () => {
    await deleteCourseAnnouncement(course.id, announcement);
    setDeleteVisible(false);
  };

  const onUndo = () => {
    if (startEdit) {
      onCreateUndo?.();
    }
    setNewMessage(announcement.message);
    setEditing(false);
    setError("");
  };
  const DeleteButtons = [
    {
      text: "Yes",
      onClick: onDelete,
    },
    {
      text: "No",
      onClick: () => setDeleteVisible(false),
    },
  ];

  return editing || startEdit ? (
    <Box
      sx={{
        padding: "16px 16px",
        bgcolor: "#F8F9FF",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          multiline
          fullWidth
          label={"Announcement"}
          focused
          inputProps={{ style: { color: theme.palette.text.primary } }}
          defaultValue={announcement.message}
          onChange={(e) => setNewMessage(e.target.value)}
          error={error !== ""}
          helperText={error}
        />
        <IconButton
          sx={{
            position: "absolute",
            bottom: error ? 30 : 10,
            right: 10,
            gap: "4px",
          }}
          onClick={onUndo}
        >
          <UndoIcon fontSize="small" />
          <Typography variant="caption">
            {startEdit ? "Cancel" : "Undo"}
          </Typography>
        </IconButton>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{ borderRadius: "32px", textTransform: "none" }}
        onClick={onSave}
      >
        {startEdit ? "Post" : "Save"}
      </Button>
    </Box>
  ) : (
    <RoundedTile>
      <Typography
        variant="body2"
        color={theme.palette.text.primary}
        sx={{ whiteSpace: "pre-line" }}
      >
        {announcement.message}
      </Typography>
      {isEdit && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomModal
            title="Delete Announcement?"
            subtitle={'"' + announcement.message + '"'}
            buttons={DeleteButtons}
            open={deleteVisible}
            setOpen={setDeleteVisible}
          />
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
              sx={{ display: "flex", textTransform: "none", gap: "8px" }}
              onClick={() => setDeleteVisible(true)}
            >
              <DeleteOutlineIcon sx={{ height: "18px", width: "18px" }} />
              <Typography color={"#38608F"} variant="subtitle2">
                Delete
              </Typography>
            </Button>
            <Button
              sx={{ textTransform: "none", gap: "8px" }}
              onClick={() => setEditing(true)}
            >
              <EditOutlinedIcon sx={{ height: "18px", width: "18px" }} />
              <Typography color={"#38608F"} variant="subtitle2">
                Edit
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </RoundedTile>
  );
};
