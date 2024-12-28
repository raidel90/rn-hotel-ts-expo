import { Avatar, List } from "react-native-paper";
import { Alert } from "./model";

const fighter = require("@assets/fighter.png");

interface AlertProps {
  alert: Alert;
  onPress?(): void;
}

export const AlertComponent = ({ alert, onPress }: AlertProps) => {
  return <List.Item
    title={alert.title}
    description={alert.description}
    onPress={onPress}
    left={props =>
      <Avatar.Image {...props} source={fighter} />
    }
  />
}