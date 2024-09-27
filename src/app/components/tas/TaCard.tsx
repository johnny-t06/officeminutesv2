import { IdentifiableUser } from "@interfaces/type";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface TaCardProps {
  ta: IdentifiableUser;
}

const TaCard = ({ ta }: TaCardProps) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar></Avatar>
      </ListItemAvatar>
      <ListItemText primary={ta.name} secondary={ta.email} />
    </ListItem>
  );
};

export default TaCard;
