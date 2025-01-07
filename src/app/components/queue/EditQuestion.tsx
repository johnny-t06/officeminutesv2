import { Box, Button, Container } from "@mui/material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";

export const EditQuestion = () => {
  const editButton = () => {
    return (
      <Button
        sx={{
          fontWeight: 500,
          fontSize: 14,
          textTransform: "initial",
          borderRadius: "100px",
          flexGrow: 1,
        }}
        fullWidth
        variant="outlined"
      >
        Edit submission
      </Button>
    );
  };
  return (
    <>
      <Container
        sx={{
          bgcolor: "primary.light",
          padding: "16px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          rowGap: "12px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* TODO(lnguye2693) - Get queue position */}
        <Box sx={{ fontWeight: 700, fontSize: 57 }}>5</Box>
        <Box sx={{ fontWeight: 500, fontSize: 11, color: "#545F70" }}>
          Queues ahead of you
        </Box>
        <Box
          sx={{
            fontWeight: 400,
            fontSize: 12,
            display: "flex",
            flexDirection: "row",
            columnGap: 0.5,
            color: "#545F70",
          }}
        >
          <NotificationAddOutlinedIcon style={{ fontSize: "16px" }} />
          <Box> We'll notify you when it's your turn</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 1,
            columnGap: "8px",
            fontWeight: 500,
            fontSize: "14px",
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="contained"
              sx={{
                fontWeight: 500,
                fontSize: 14,
                textTransform: "initial",
                borderRadius: "100px",
                display: "flex",
                flexDirection: "row",
                columnGap: 1
              }}
              style={{ boxShadow: "none" }}
              fullWidth
            >
              <KeyboardReturnOutlinedIcon style={{ fontSize: "14px" }} />
              <Box>Leave queue</Box>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1 }}>{editButton()}</Box>
        </Box>
      </Container>
    </>
  );
};
