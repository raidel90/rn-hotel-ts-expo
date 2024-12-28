import { GuestAvatar } from "@components/GuestAvatar";
import { List } from "react-native-paper";
import { Room } from "./model";

interface RoomProps {
  room: Room;
  onPress?(): void;
}

export const RoomComponent = ({ room, onPress }: RoomProps) => {
  return <List.Item
    title={`Room ${room.roomNumber}`}
    description={room.guest?.name ?? "Vacant"}
    onPress={onPress}
    left={props =>
      <GuestAvatar {...props} source={room.guest?.avatar}
        overlay={room.guest ?
          room.guest.serviceRequests.length > 0 ?
            "needs-service" :
            "occupied" :
          "vacant"}
        />
    } />
}
