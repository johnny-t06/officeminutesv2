"use client";
import Header from "@components/Header";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Page = () => {
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
        title="Classes"
      />
      <div className="flex flex-col min-h-[calc(100vh-56px)] items-center text-[#49454F] justify-center">
        Coming Soon!
      </div>
    </div>
  );
};

export default Page;
