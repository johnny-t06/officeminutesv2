import { IdentifiableUser } from "@interfaces/type";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface TaCardProps {
  ta: IdentifiableUser;
}

const TaCard = (props: TaCardProps) => {
  const { ta } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={ta.name} secondary={ta.email} />
    </ListItem>
  );
};

export default TaCard;
