"use client";

import { useUserSession } from "@context/UserSessionContext";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { user, onSignIn } = useUserSession();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push("/private/course");
    }
  }, [user]);

  if (user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-[100]">
        <div className="flex items-center justify-center gap-1">
          <svg
            width="18"
            height="30"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.295406 4C0.153914 4 0.0571621 3.85709 0.109711 3.72572L0.51517 2.71207C0.829706 1.92574 1.39319 1.26409 2.11941 0.828355V0.828355C3.0228 0.286322 4.05651 0 5.11003 0H11.5V4H0.295406ZM2.5 12C1.87049 12 1.27771 11.7036 0.9 11.2L0.18 10.24C0.0733333 10.0978 0.0733333 9.90222 0.18 9.76L0.9 8.8C1.27771 8.29639 1.87049 8 2.5 8H11.5V12H2.5ZM4 20C3.35089 20 2.71929 19.7895 2.2 19.4L1.89733 19.173C1.31043 18.7328 0.855887 18.1397 0.583424 17.4586L0.109711 16.2743C0.0571621 16.1429 0.153914 16 0.295407 16H11.5V20H4Z"
              fill="#38608F"
            />
          </svg>
          <svg
            width="48"
            height="48"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[spin_2s_linear_infinite]"
          >
            <path
              d="M16 32C11.5333 32 7.75 30.45 4.65 27.35C1.55 24.25 0 20.4667 0 16C0 11.5667 1.55 7.79167 4.65 4.675C7.75 1.55833 11.5333 0 16 0C20.4333 0 24.2083 1.55833 27.325 4.675C30.4417 7.79167 32 11.5667 32 16C32 20.4667 30.4417 24.25 27.325 27.35C24.2083 30.45 20.4333 32 16 32ZM16 28C19.3333 28 22.1667 26.8333 24.5 24.5C26.8333 22.1667 28 19.3333 28 16C28 12.6667 26.8333 9.83333 24.5 7.5C22.1667 5.16667 19.3333 4 16 4C12.6667 4 9.83333 5.16667 7.5 7.5C5.16667 9.83333 4 12.6667 4 16C4 19.3333 5.16667 22.1667 7.5 24.5C9.83333 26.8333 12.6667 28 16 28ZM20.55 23.45L23.4 20.6L18 15.2V8H14V16.85L20.55 23.45Z"
              fill="#38608F"
            />
          </svg>
        </div>
      </div>
    );
  }

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
          onClick={() => onSignIn()}
        >
          <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
            Get started
          </Typography>
        </Button>
      </div>
    </div>
  );
}
