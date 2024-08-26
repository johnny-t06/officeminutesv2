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

  // const handleChoice = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newChoice: TagOption[]
  // ) => {
  //   console.log(newChoice);
  //   updateQuestionTags(tagsKey, newChoice);
  // };

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
      {/* <Box sx={{ fontSize: 14 }}>{tagsKey}</Box>
      <StyledToggleButtonGroup
        color="secondary"
        value={allQuestionTags[tagsKey] ?? []}
        onChange={handleChoice}
      >
        {tags.options.map((tag) => (
          <ToggleButton
            key={tag.choice}
            id={tag.choice}
            value={tag}
            sx={{
              textTransform: "none",
              "&.MuiToggleButton-root": {
                // borderWidth: 1,
                border: 1,
                height: "30px",
                padding: "4px 10px",
                // padding: 2
              },
              "&.Mui-selected": {
                // textTransform: "uppercase",
                color: "#000",
                bgcolor: "#E5E5E5",
              },
            }}
          >
            {tag.choice}
          </ToggleButton>

          // <FormControl>

          // </FormControl>
        ))}
      </StyledToggleButtonGroup> */}

      <FormControl>
        <FormLabel id={tagsKey}>{tagsKey}</FormLabel>
        {/* <FormGroup> */}
        <Box>
          {tags.options.map((o) => (
            // <FormControlLabel
            //   control={
            //     <Checkbox
            //       onChange={handleChange}
            //       checked={state[o.choice]}
            //       name={o.choice}
            //       icon={
            //         <Box
            //           sx={{
            //             border: 1,
            //             paddingTop: 0.5,
            //             paddingBottom: 0.5,
            //             paddingLeft: 2,
            //             paddingRight: 2,
            //             borderRadius: 2,
            //           }}
            //         >
            //           {o.choice}
            //         </Box>
            //       }
            //     />
            //   }
            //   label=""
            // ></FormControlLabel>
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
  // const [val, setVal] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setVal((event.target as HTMLInputElement).value);
    // console.log(event.target.value);
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
            // <Box>{o.choice}</Box>
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
