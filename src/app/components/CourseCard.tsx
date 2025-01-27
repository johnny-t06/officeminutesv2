import { IdentifiableCourse } from "@interfaces/type";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
interface CourseCardProps {
  course: IdentifiableCourse;
}
export const CourseCard = (props: CourseCardProps) => {
  const { course } = props;
  const router = useRouter();
  return (
    <Box
      className="flex items-center justify-between px-4 w-full"
      onClick={() => router.push(`/private/course/${course.id}`)}
    >
      <Box
        className="flex flex-col w-full p-4"
        sx={{
          backgroundColor: "#f8f9ff",
          borderRadius: "12px",
          borderColor: "#c2c6cf",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <Typography variant="h6">
          {course.id.toUpperCase() + " " + course.name}
        </Typography>
        <Typography variant="subtitle1" color="#43474E">
          {course.professors.join(", ")}
        </Typography>
      </Box>
    </Box>
  );
};
