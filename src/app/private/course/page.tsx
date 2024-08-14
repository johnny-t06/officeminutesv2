"use client";

import Header from "@components/Header";
import { Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

const Page = async () => {
  const router = useRouter();

  //   fetch courses and render
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        leftIcon={
          <IconButton>
            <MenuIcon />
          </IconButton>
        }
        title="Classes"
      />
      <div className="flex flex-col items-center justify-center flex-grow gap-4">
        <div>Add a class to get started</div>
        <Button
          style={{ textTransform: "none" }}
          className="py-2.5 px-6 bg-[#38608F] rounded-full"
          onClick={() => router.push("/private/course/join")}
        >
          <Typography variant="subtitle2" color="#FFFFFF" fontWeight={600}>
            Join class
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default Page;
