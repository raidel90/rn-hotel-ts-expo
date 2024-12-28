import { withData, WithDataProps } from "@components/withData";
import { TabContainerScreenProps } from "@navigation/TabContainerParamList";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { AlertComponent } from "./AlertComponent";
import { useAlerts } from "./hooks";
import { Alert } from "./model";

export type AlertsScreenProps = TabContainerScreenProps<"Alerts">;

const AlertsScreenDisplay = ({ data, navigation }: WithDataProps<Alert[], AlertsScreenProps>) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <AlertComponent alert={item} onPress={() => {
          navigation.push("AlertDetail", { alertId: item.id })
        }} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.text}>All clear!</Text>}
        contentContainerStyle={[ { flexGrow: 1 } , data.length ? null : { justifyContent: 'center'} ]}
      />
    </SafeAreaView>
  );
}

export const AlertsScreen = withData(useAlerts)(AlertsScreenDisplay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
  }
});