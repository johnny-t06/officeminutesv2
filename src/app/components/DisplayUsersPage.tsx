"use client";
import { IdentifiableUsers } from "@interfaces/type";
import { Box, IconButton, Typography } from "@mui/material";
import theme from "theme";
import DisplayTas from "./tas";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface DisplayUsersPageProps {
  onDutyTas?: IdentifiableUsers;
  offDutyTas?: IdentifiableUsers;
  students?: IdentifiableUsers;
}

const DisplayUsersPage = (props: DisplayUsersPageProps) => {
  const { onDutyTas, offDutyTas, students } = props;
  const router = useRouter();

  return (
    <div
      className="flex flex-col"
      style={{
        height: "calc(100vh - 112px)", //Accounting for header and bottom nav
        overflow: "hidden",
      }}
    >
      <Header
        leftIcon={
          <IconButton
            onClick={() => {
              router.back();
            }}
            edge="start"
          >
            <ArrowBackIcon />
          </IconButton>
        }
        title={onDutyTas && offDutyTas ? "TAs" : "Students"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        {onDutyTas && offDutyTas ? (
          <>
            <Typography
              variant="h6"
              color={theme.palette.text.primary}
              sx={{ fontWeight: "bold" }}
            >
              On Duty
            </Typography>
            <Box
              sx={{
                height: "25vh",
                overflow: "auto",
              }}
            >
              <DisplayTas tas={onDutyTas} />
            </Box>
            <Typography
              variant="h6"
              color={theme.palette.text.primary}
              sx={{ fontWeight: "bold" }}
            >
              Off Duty
            </Typography>
            <Box
              sx={{
                height: "25vh",
                overflow: "auto",
              }}
            >
              <DisplayTas tas={offDutyTas} />
            </Box>
          </>
        ) : students ? (
          <Box
            sx={{
              height: "calc(100vh - 190px)",
              overflow: "auto",
            }}
          >
            <DisplayTas tas={students} />
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default DisplayUsersPage;
