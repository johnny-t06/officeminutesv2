"use client";
import MenuButton from "@components/buttons/MenuButton";
import Header from "@components/Header";
import { useUserSession } from "@context/UserSessionContext";
import { Avatar, Button } from "@mui/material";
import { trimUserName } from "@utils/index";
import theme from "theme";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useRouter } from "next/navigation";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import { useUserOrRedirect } from "@hooks/useUserOrRedirect";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  const router = useRouter();
  const { course } = useOfficeHour();
  const { onSignOut } = useUserSession();
  const user = useUserOrRedirect();
  if (!user) {
    return null;
  }
  const isUserTA = course.tas.includes(user.id);

  return (
    <div>
      <Header
        leftIcon={<MenuButton isEdge />}
        title={courseId.toUpperCase()}
        alignCenter
      />
      <div className="flex items-center gap-4">
        <Avatar
          sx={{ bgcolor: theme.palette.primary.main, height: 56, width: 56 }}
        >
          {user ? user.name[0] : ""}
        </Avatar>
        <div>
          <div className="text-xl font-bold">{trimUserName(user)}</div>
          <div className="text-[#73777F]">{user ? user.email : ""}</div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-6 px-3">
        <div
          className="flex justify-between items-center"
          onClick={() =>
            router.push(`/private/course/${course.id}/profile/classes`)
          }
        >
          <div>
            <div className="text-lg">Classes</div>
            <div className="text-[#43474E] text-sm">
              Manage your classes here
            </div>
          </div>
          <ArrowRightOutlinedIcon sx={{ color: "#49454F" }} />
        </div>
        {!isUserTA && (
          <div
            className="flex justify-between items-center"
            onClick={() =>
              router.push(`/private/course/${course.id}/profile/help`)
            }
          >
            <div>
              <div className="text-lg">Get Help</div>
              <div className="text-[#43474E] text-sm">Read our FAQ</div>
            </div>
            <ArrowRightOutlinedIcon sx={{ color: "#49454F" }} />
          </div>
        )}
        <div
          className="flex justify-between items-center"
          onClick={() =>
            router.push(`/private/course/${course.id}/profile/feedback`)
          }
        >
          <div>
            <div className="text-lg">Send Feedback</div>
            <div className="text-[#43474E] text-sm">
              We want to hear what you think!
            </div>
          </div>
          <ArrowRightOutlinedIcon sx={{ color: "#49454F" }} />
        </div>
      </div>
      <Button
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          textTransform: "none",
          borderRadius: "100px",
          width: "100%",
          fontSize: 16,
          marginTop: "32px",
          fontWeight: 550,
        }}
        onClick={onSignOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default Page;
