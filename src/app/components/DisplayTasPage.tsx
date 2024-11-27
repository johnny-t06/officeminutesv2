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
  const testTas = offDutyTas.concat(offDutyTas);
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
        title="TAs"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          sx={{ fontWeight: "bold" }}
        >
          On Duty
        </Typography>
        <Box
          sx={{
            height: "25%",
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
            height: "25%",
            overflow: "auto",
          }}
        >
          <DisplayTas tas={testTas} />
        </Box>
      </Box>
    </div>
  );
};

export default DisplayTasPage;
