import { Box, Button, Typography } from "@mui/material";
import theme from "theme";
import { AnnouncementTile } from "./AnnouncementTile";
import React from "react";
import { Announcement } from "@interfaces/db";
import { sortAnnouncements } from "@utils/index";
import AddIcon from "@mui/icons-material/Add";
import { Timestamp } from "firebase/firestore";
import { CustomFloatingButton } from "./buttons/CustomFloatingButton";

interface DisplayAnnouncementsProps {
  announcements: Announcement[];
  editable: boolean;
}

export const DisplayAnnouncements = (props: DisplayAnnouncementsProps) => {
  const { announcements, editable } = props;

  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [currAnnouncements, setCurrAnnouncements] =
    React.useState<Announcement[]>(announcements);

  React.useEffect(() => {
    setCurrAnnouncements(announcements);
  }, [announcements]);

  const onCreate = () => {
    setCurrAnnouncements([
      ...currAnnouncements,
      {
        message: "",
        createdAt: Timestamp.now(),
      },
    ]);
    setIsEdit(true);
  };

  const onEditDone = () => {
    if (isEdit && currAnnouncements.length > announcements.length) {
      setCurrAnnouncements(announcements);
    }
    setIsEdit(!isEdit);
  };

  return (
    <Box>
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
          Announcement
        </Typography>
        {editable && (
          <Button onClick={onEditDone} sx={{ textTransform: "none" }}>
            <Typography color={"#38608F"} variant="subtitle2">
              {isEdit ? "Done" : "Edit"}
            </Typography>
          </Button>
        )}
      </Box>
      {currAnnouncements.length === 0 ? (
        <AnnouncementTile
          announcement={{
            message: "No announcements yet",
            createdAt: Timestamp.now(),
          }}
          isEdit={false}
        />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sortAnnouncements(currAnnouncements).map((announcement, index) => (
            <AnnouncementTile
              key={index}
              announcement={announcement}
              isEdit={isEdit}
              startEdit={announcement.message === ""}
            />
          ))}
        </Box>
      )}

      {editable && (
        <CustomFloatingButton
          text="Create Announcement"
          icon={<AddIcon />}
          onClick={onCreate}
        />
      )}
    </Box>
  );
};
