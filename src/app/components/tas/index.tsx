import { IdentifiableUsers } from "@interfaces/type";
import { List } from "@mui/material";
import TaCard from "./TaCard";

interface tasProps {
  tas: IdentifiableUsers;
}

const DisplayTas = (props: tasProps) => {
  const { tas } = props;
  return (
    <List>
      {tas.map((ta) => (
        <TaCard key={ta.id} ta={ta} />
      ))}
    </List>
  );
};

export default DisplayTas;