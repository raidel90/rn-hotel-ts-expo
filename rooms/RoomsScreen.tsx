import { withData, WithDataProps } from "@components/withData";
import { TabContainerScreenProps } from "@navigation/TabContainerParamList";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { RoomsResult } from "./model";
import { useRooms } from "./queries";
import { RoomComponent } from "./RoomComponent";

export type RoomsScreenProps = TabContainerScreenProps<"Rooms">;

const RoomsScreenDisplay = ({ data, navigation }: WithDataProps<RoomsResult, RoomsScreenProps>) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.rooms}
        renderItem={({ item }) => <RoomComponent room={item} onPress={() => {
          navigation.push("RoomDetail", {
            roomNumber: item.roomNumber
          })
        }} />}
        keyExtractor={(item) => item.roomNumber}
      />
    </SafeAreaView>
  );
}

export const RoomsScreen = withData(useRooms)(RoomsScreenDisplay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});