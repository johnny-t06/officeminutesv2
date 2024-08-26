import { TagOption, Tags } from "@interfaces/db";
import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  colors,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import React from "react";

interface TagsProps {
  tagsKey: string;
  tags: Tags["key"];
  allQuestionTags: Record<string, TagOption[]>;
  updateQuestionTags: (tagsKey: string, newTags: TagOption[]) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  flexWrap: "wrap",
  gap: 6,
  // padding: 1,
  color: "primary",
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    // margin: 4,
    borderRadius: 8,
  },
});

export const MultipleChoiceTags = (props: TagsProps) => {
  const { tagsKey, tags, allQuestionTags, updateQuestionTags } = props;

  const [state, setState] = React.useState<Record<string, boolean>>(() => {
    let init: Record<string, boolean> = {};
    tags.options.forEach((o) => {
      init[o.choice] = false;
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
      <FormControl>
        <FormLabel id={tagsKey}>{tagsKey}</FormLabel>
        {/* <FormGroup> */}
        <Box>
          {tags.options.map((o) => (
            <Checkbox
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
          {/* </FormGroup> */}
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
      <FormControl>
        <FormLabel id={tagsKey}>{tagsKey}</FormLabel>
        <RadioGroup onChange={handleChange}>
          {tags.options.map((o) => (
            <FormControlLabel
              value={o.choice}
              control={<Radio />}
              label={o.choice}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
