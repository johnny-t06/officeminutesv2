import Header from "@components/Header";
import MenuIcon from "@mui/icons-material/Menu";

const Page = () => {
  return (
    <div>
      <Header leftIcon={<MenuIcon />} title="Course Name" alignCenter />
      <text> this is the queue! </text>
    </div>
  );
};

export default Page;
