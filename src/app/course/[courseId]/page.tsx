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

  return (
    <OfficeHourProvider courseId={courseId}>
      {/* TODO(nickbar01234) - Display UI */}
    </OfficeHourProvider>
  );
};

export default Page;
