import { GuestAvatar } from "@components/GuestAvatar";
import { List } from "react-native-paper";
import { Request } from "./model";

interface RequestProps {
  request: Request;
  onPress?(): void;
}

export const RequestComponent = ({ request, onPress }: RequestProps) => {
  return <List.Item
    title={request.description}
    description={`Room ${request.roomNumber}: ${request.guestName}`}
    onPress={onPress}
    left={props =>
      <GuestAvatar {...props} source={request.guestAvatar}
        overlay="needs-service"
        />
    } />
}
