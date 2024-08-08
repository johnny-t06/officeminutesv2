import Header from "@components/Header";
import MenuIcon from "@mui/icons-material/Menu";

const Page = () => {
  return (
    <div>
      <Header leftIcon={<MenuIcon />} title="Profile" alignCenter />
      <text> this is the profile! </text>
    </div>
  );
};

export default Page;
