"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface ErrorNavigationProps {
  message?: string;
  redirectTo?: string;
  redirectMessage?: string;
}

const ErrorNavigation = (props: ErrorNavigationProps) => {
  const { message, redirectTo, redirectMessage } = props;
  const router = useRouter();
  return (
    <Modal open>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5" fontWeight="bold">
              Ooops!
            </Typography>
          </Box>
        </Box>
        <Typography mt={2}>
          {message ?? "Something went wrong. An error has occurred."}
        </Typography>
        <Box mt={4} textAlign="right">
          <Button
            variant="outlined"
            onClick={() => router.replace(redirectTo ?? "/")}
            sx={{ textTransform: "none", borderColor: "red", color: "red" }}
          >
            {redirectMessage ?? "Redirect"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorNavigation;
