import { ErrorScreen } from "@components/ErrorScreen";
import { GuestAvatar } from "@components/GuestAvatar";
import { LoadingScreen } from "@components/LoadingScreen";
import { StackContainerScreenProps } from "@navigation/StackContainerParamList";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { useRoom } from "./queries";

type RoomDetailScreenProps = StackContainerScreenProps<"RoomDetail">;

export const RoomDetailScreen = ({ route, navigation }: RoomDetailScreenProps) => {
  const roomNumber = route.params.roomNumber;
  const { data, error } = useRoom(roomNumber);

  navigation.setOptions({
    title: `Room ${roomNumber}`
  })

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (!data) {
    return <LoadingScreen />;
  }

  if (!data.guest) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Room</Text>
        <Text style={styles.text}>{data.roomNumber}</Text>
        <Text style={styles.label}>Guest</Text>
        <Text style={styles.text}>None</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GuestAvatar
        source={data.guest.avatar}
        overlay={data.guest.serviceRequests.length > 0 ? "needs-service" : "occupied"}
        size={200}
        style={styles.avatar}
      />
      <Text style={styles.label}>Room</Text>
      <Text style={styles.text}>{data.roomNumber}</Text>
      <Text style={styles.label}>Guest</Text>
      <Text style={styles.text}>{data.guest.name}</Text>
      <Text style={styles.label}>Requests</Text>
      <FlatList style={styles.list}
        data={data.guest.serviceRequests}
        renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 20
  },
  avatar: {
    alignSelf: 'center',
  },
  label: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '200',
  },
  text: {
    fontSize: 25,
  },
  list: {
    width: '100%',
  },
});