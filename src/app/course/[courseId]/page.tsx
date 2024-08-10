import OfficeHourProvider from "@context/OfficeHourContext";

interface PageProps {
  params: {
    courseId: string;
  };
}

const Page = (props: PageProps) => {
  const {
    params: { courseId },
  } = props;

  return null;
};

export default Page;
