import Header from "@components/Header";
import MenuIcon from "@mui/icons-material/Menu";

const Page = async () => {
  //   fetch courses and render

  return (
    <div>
      <Header leftIcon={<MenuIcon />} title="Course Name" alignCenter />
      <div>My classes</div>
    </div>
  );
};

export default Page;
