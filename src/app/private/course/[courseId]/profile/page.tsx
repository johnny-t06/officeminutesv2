import Header from "@components/Header";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const Page = () => {
  return (
    <div>
      <Header
        leftIcon={
          <IconButton>
            <MenuIcon />
          </IconButton>
        }
        title="Profile"
        alignCenter
      />
      <text> this is the profile! </text>
    </div>
  );
};

export default Page;