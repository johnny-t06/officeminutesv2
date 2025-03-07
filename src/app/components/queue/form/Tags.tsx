import { TagOption, Tags } from "@interfaces/db";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { getCourseTopicTags } from "@utils/index";
import React from "react";
import theme from "theme";

interface TagsProps {
  tagsKey: string;
  tags: Tags["key"];
  allQuestionTags: Record<string, TagOption[]>;
  updateQuestionTags: (tagsKey: string, newTags: TagOption[]) => void;
}

export const MultipleChoiceTags = (props: TagsProps) => {
  const { tagsKey, tags, allQuestionTags, updateQuestionTags } = props;

  const [state, setState] = React.useState<Record<string, boolean>>(() => {
    let init: Record<string, boolean> = {};
    tags.options.forEach((o) => {
      if (
        Object.hasOwn(allQuestionTags, tagsKey) &&
        allQuestionTags[tagsKey].includes(o)
      ) {
        init[o.choice] = true;
      } else {
        init[o.choice] = false;
      }
    });
    return init;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let change = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(change);

    let tag = tags.options.filter((o) => change[o.choice]);
    updateQuestionTags(tagsKey, tag);
  };
  return (
    <Box>
      <FormControl required={tags.required}>
        <FormLabel
          id={tagsKey}
          sx={{
            color: theme.palette.text.primary,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {tagsKey}
        </FormLabel>
        <Box sx={{ marginTop: 1 }}>
          {getCourseTopicTags(tags.options).map((tag) => (
            <Checkbox
              style={{ padding: 4 }}
              key={tag}
              onChange={handleChange}
              checked={state[tag]}
              name={tag}
              icon={
                <Button
                  sx={{
                    border: 1,
                    borderColor: theme.palette.text.secondary,
                    color: theme.palette.text.secondary,
                    paddingY: 0.5,
                    paddingX: 2,
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  {tag}
                </Button>
              }
              checkedIcon={
                <Button
                  variant="contained"
                  sx={{
                    border: 1,
                    borderColor: theme.palette.primary.main,
                    paddingY: 0.5,
                    paddingX: 2,
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  {tag}
                </Button>
              }
            />
          ))}
        </Box>
      </FormControl>
    </Box>
  );
};

export const SingleChoiceTags = (props: TagsProps) => {
  const { tagsKey, tags, allQuestionTags, updateQuestionTags } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = tags.options.find((o) => o.choice == event.target.value);

    if (tag !== undefined) {
      updateQuestionTags(tagsKey, [tag]);
    } else {
      updateQuestionTags(tagsKey, []);
    }
  };
  return (
    <Box>
      <FormControl required={tags.required}>
        <FormLabel
          id={tagsKey}
          sx={{
            color: theme.palette.text.primary,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {tagsKey}
        </FormLabel>
        <RadioGroup
          onChange={handleChange}
          value={
            allQuestionTags[tagsKey][0]
              ? allQuestionTags[tagsKey][0].choice
              : ""
          }
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: 3,
              marginTop: "10px",
            }}
          >
            {tags.options.map((o) => (
              <FormControlLabel
                key={o.choice}
                value={o.choice}
                control={
                  <Radio
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  />
                }
                label={
                  <>
                    <Typography>{o.choice}</Typography>
                    {o.note && (
                      <Typography
                        fontSize={14}
                        color={theme.palette.text.secondary}
                      >
                        {o.note}
                      </Typography>
                    )}
                  </>
                }
                sx={{
                  marginY: 2,
                }}
              />
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
