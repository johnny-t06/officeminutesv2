import Header from "@components/Header";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const Page = () => {
  return (
    <div>
      <Header
        leftIcon={
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
        }
        title="Course Name"
        alignCenter
      />
    </div>
  );
};

export default Page;
