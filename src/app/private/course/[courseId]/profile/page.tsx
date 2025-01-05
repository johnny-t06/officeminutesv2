"use client";
import MenuButton from "@components/buttons/MenuButton";
import Header from "@components/Header";
import { useUserSession } from "@context/UserSessionContext";
import { Avatar, Button } from "@mui/material";
import { getUserSessionOrRedirect, trimName } from "@utils/index";
import theme from "theme";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useRouter } from "next/navigation";
import { useOfficeHour } from "@hooks/oh/useOfficeHour";
import React from "react";
import { getCourse } from "@services/client/course";
import { getUsers } from "@services/client/user";
import Spinner from "@components/Spinner";

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
  const user = getUserSessionOrRedirect();

  const [loading, setLoading] = React.useState(true);
  const [isUserTA, setIsUserTA] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourse(courseId);
        const tasData = await getUsers(courseData.tas);
        setIsUserTA(tasData.some((ta) => ta.id === user.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spinner />
      </div>
    );
  }

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
          <div className="text-xl font-bold">
            {trimName(user ? user.name : "")}
          </div>
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
