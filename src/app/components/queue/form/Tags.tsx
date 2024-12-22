import { TagOption, Tags } from "@interfaces/db";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

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
        <FormLabel id={tagsKey}>{tagsKey}</FormLabel>
        <Box>
          {tags.options.map((o) => (
            <Checkbox
              key={o.toString()}
              onChange={handleChange}
              checked={state[o.choice]}
              name={o.choice}
              icon={
                <Box
                  sx={{
                    border: 1,
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: 2,
                  }}
                >
                  {o.choice}
                </Box>
              }
              // TODO(lnguyen2693) - style button when user choose a tag
              checkedIcon={
                <Box
                  sx={{
                    border: 1,
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    paddingLeft: 2,
                    paddingRight: 2,
                    borderRadius: 2,
                    bgcolor: "primary",
                  }}
                >
                  {o.choice}
                </Box>
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
        <FormLabel id={tagsKey}>{tagsKey}</FormLabel>
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
              paddingTop: 1,
              paddingBottom: 2,
            }}
          >
            {/* TODO(lnguyen2693) - display notes */}
            {tags.options.map((o) => (
              <FormControlLabel
                value={o.choice}
                control={<Radio />}
                // label={o.choice}
                label={
                  <Box
                    sx={{ marginBottom: 2.5, marginTop: 2.5, marginLeft: 1 }}
                  >
                    {o.choice}
                  </Box>
                }
              ></FormControlLabel>
            ))}
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
