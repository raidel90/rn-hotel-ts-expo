import { withData, WithDataProps } from "@components/withData";
import { StackContainerScreenProps } from "@navigation/StackContainerParamList";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useEmployee } from "../providers/EmployeeContainer";
import { DashboardItem } from "./DashboardItem";
import { SummaryResult } from "./model";
import { useSummary } from "./hooks";

type DashboardScreenProps = StackContainerScreenProps<"Dashboard">;

const DashboardScreenDisplay = ({ data, navigation }: WithDataProps<SummaryResult, DashboardScreenProps>) => {
  const { clockOut } = useEmployee();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <DashboardItem title="Rooms" icon="door-closed" value={data.occupiedRooms} onPress={() =>
          navigation.push("Tab", { screen: "Rooms" })
        } />
        <DashboardItem title="Requests" icon="bell" value={data.pendingRequests} onPress={() =>
          navigation.push("Tab", { screen: "Requests" })
        } />
      </View>
      <View style={{flexDirection: "row"}}>
        <DashboardItem title="Tasks" icon="clipboard-list" value={data.pendingTasks} onPress={() =>
          navigation.push("Tab", { screen: "Tasks" })
        } />
        <DashboardItem title="Alerts" icon="alert" value={data.pendingAlerts} onPress={() =>
          navigation.push("Tab", { screen: "Alerts" })
        } />
      </View>
      <Button style={styles.button} contentStyle={styles.text} mode="contained" onPress={() => {
          clockOut();
          navigation.pop();
        }}>
        Clock Out
      </Button>
    </SafeAreaView>
  );
};

export const DashboardScreen = withData(useSummary)(DashboardScreenDisplay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    width: 320,
  },
  text: {
    paddingVertical: 10,
  },
});