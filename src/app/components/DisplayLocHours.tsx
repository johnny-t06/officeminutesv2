"use client";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import { Box, Button, TextField, Typography } from "@mui/material";
import { partialUpdateCourse } from "@services/client/course";
import React from "react";
import theme from "theme";

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
    if (isEdit && currLocation.trim() === "") {
      setError("Location & Hours cannot be empty");
      return;
    }

    if (isEdit && currLocation.trim() !== location) {
      await partialUpdateCourse(course.id, { location: currLocation.trim() });
    }
    setIsEdit(!isEdit);
  };

  return (
    <Box>
      <Box className="flex flex-row justify-between">
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
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
      <Box
        sx={{
          padding: "16px 16px",
          gap: "10px",
          flexDirection: "column",
          display: "flex",
          marginTop: "16px",
        }}
      >
        {isEdit ? (
          <TextField
            focused
            multiline
            label="Location & Hours"
            fullWidth
            defaultValue={currLocation}
            onChange={(e) => setCurrLocation(e.target.value)}
            error={error !== ""}
            helperText={error}
          />
        ) : (
          <Typography variant="body2" color={theme.palette.text.primary}>
            {renderWithLinks(currLocation)}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
