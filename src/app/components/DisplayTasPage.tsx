"use client";
import { IdentifiableUsers } from "@interfaces/type";
import { Box, IconButton, Typography } from "@mui/material";
import theme from "theme";
import DisplayTas from "./tas";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

interface DisplayTasPageProps {
  onDutyTas: IdentifiableUsers;
  offDutyTas: IdentifiableUsers;
}

const DisplayTasPage = (props: DisplayTasPageProps) => {
  const { onDutyTas, offDutyTas } = props;

  const router = useRouter();
  return (
    <div>
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
        title="TAs"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            height: "40%",
            overflow: "auto",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ fontWeight: "bold" }}
          >
            On Duty
          </Typography>
          <DisplayTas tas={onDutyTas} />
        </Box>

        <Box
          sx={{
            height: "40%",
            overflow: "auto",
          }}
        >
          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            sx={{ fontWeight: "bold" }}
          >
            Off Duty
          </Typography>
          <DisplayTas tas={offDutyTas} />
        </Box>
      </Box>
    </div>
  );
};

export default DisplayTasPage;
