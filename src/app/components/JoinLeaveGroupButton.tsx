"use client";
import { Box } from "@mui/material";
import { hasPassed } from "@utils/index";
import { CustomButton } from "./buttons/CustomButton";
import { IdentifiableQuestion } from "@interfaces/type";
import theme from "theme";
interface JoinLeaveGroupButtonProps {
  question: IdentifiableQuestion;
  inGroup: boolean;
  onJoinGroup: () => Promise<void>;
}

export const JoinLeaveGroupButton = (props: JoinLeaveGroupButtonProps) => {
  const { question, inGroup, onJoinGroup } = props;
  return (
    <Box marginTop="8px" display={hasPassed(question) ? "none" : "flex"}>
      <CustomButton
        variant="contained"
        customColor={
          inGroup ? theme.palette.primary.light : theme.palette.primary.main
        }
        sx={{
          marginTop: "16px",
          paddingY: "10px",
          paddingX: "24px",
          borderRadius: "32px",
          textTransform: "none",
          width: "100%",
          color: inGroup ? "#000" : "#fff",
        }}
        onClick={async () => {
          await onJoinGroup();
        }}
      >
        {inGroup ? "Leave group" : "Join group"}
      </CustomButton>
    </Box>
  );
};
