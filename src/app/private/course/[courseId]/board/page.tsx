import Header from "@components/Header";
import { Button, Typography } from "@mui/material";

const Page = () => {
  return (
    <div>
      <Header
        title="Board"
        rightIcon={
          <Button style={{ textTransform: "none" }}>
            <Typography variant="subtitle2" fontWeight={500}>
              View History
            </Typography>
          </Button>
        }
      />
      <text> This is the board! </text>
    </div>
  );
};

export default Page;
