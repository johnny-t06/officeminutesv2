"use client";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { partialUpdateCourse } from "@services/client/course";
import React from "react";
import theme from "theme";
import { RoundedTile } from "./RoundedTile";
import UndoIcon from "@mui/icons-material/Undo";
interface DisplayLocHoursProps {
  location: string;
  editable?: boolean;
}

const renderWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith("http") ? part : `https://${part}`;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#38608F", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const DisplayLocHours = (props: DisplayLocHoursProps) => {
  const { location, editable = false } = props;
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [currLocation, setCurrLocation] = React.useState<string>(location);
  const [error, setError] = React.useState<string>("");
  const { course } = useOfficeHour();

  React.useEffect(() => {
    setCurrLocation(location);
  }, [location]);

  const onEditDone = async () => {
    const trimmedCurrLocation = currLocation.trim();

    if (isEdit) {
      if (trimmedCurrLocation === "") {
        setError("Location & Hours cannot be empty");
        return;
      } else if (trimmedCurrLocation !== location) {
        await partialUpdateCourse(course.id, { location: trimmedCurrLocation });
      }
      setError("");
    }

    setIsEdit(!isEdit);
  };

  const onUndo = () => {
    setCurrLocation(location);
    setError("");
    setIsEdit(false);
  };

  return (
    <Box>
      <Box className="flex flex-row justify-between">
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          Location & Hours
        </Typography>
        {editable && (
          <Button onClick={onEditDone} sx={{ textTransform: "none" }}>
            <Typography color={"#38608F"} variant="subtitle2">
              {isEdit ? "Save" : "Edit"}
            </Typography>
          </Button>
        )}
      </Box>
      <RoundedTile>
        {isEdit ? (
          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              focused
              multiline
              label="Location & Hours"
              fullWidth
              value={currLocation}
              onChange={(e) => setCurrLocation(e.target.value)}
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
              <Typography variant="caption">Undo</Typography>
            </IconButton>
          </Box>
        ) : (
          <Typography
            variant="body2"
            color={theme.palette.text.primary}
            sx={{ whiteSpace: "pre-line" }}
          >
            {renderWithLinks(currLocation)}
          </Typography>
        )}
      </RoundedTile>
    </Box>
  );
};
