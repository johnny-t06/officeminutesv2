"use client";

import { useUserSessionStore } from "@providers/UserSessionProvider";
import { Button, Typography } from "@mui/material";

export default function Page() {
  const onSignIn = useUserSessionStore((state) => state.onSignIn);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="flex gap-1.5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3.5em"
            height="3.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15 4a8 8 0 0 1 8 8a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8m0 2a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6a6 6 0 0 0-6-6m-1 2h1.5v3.78l2.33 2.33l-1.06 1.06L14 12.4zM2 18a1 1 0 0 1-1-1a1 1 0 0 1 1-1h3.83c.31.71.71 1.38 1.17 2zm1-5a1 1 0 0 1-1-1a1 1 0 0 1 1-1h2.05L5 12l.05 1zm1-5a1 1 0 0 1-1-1a1 1 0 0 1 1-1h3c-.46.62-.86 1.29-1.17 2z"
            />
          </svg>
          <div className="text-4xl font-semibold">OfficeMinutes</div>
        </div>
        <div className="mt-1">Answers in minutes, Not hours</div>
        <Button
          className="py-2.5 px-6 bg-[#38608F] rounded-full mt-6 normal-case"
          onClick={onSignIn}
        >
          <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
            Get started
          </Typography>
        </Button>
      </div>
    </div>
  );
}
