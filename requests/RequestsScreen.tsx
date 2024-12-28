import { withData, WithDataProps } from "@components/withData";
import { TabContainerScreenProps } from "@navigation/TabContainerParamList";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { RequestsResult } from "./model";
import { useRequests } from "./queries";
import { RequestComponent } from "./RequestComponent";

export type RequestsScreenProps = TabContainerScreenProps<"Requests">;

const RequestsScreenDisplay = ({ data, navigation }: WithDataProps<RequestsResult, RequestsScreenProps>) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.requests}
        renderItem={({ item }) => <RequestComponent request={item} onPress={() => {
          navigation.push("RequestDetail")
        }} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export const RequestsScreen = withData(useRequests)(RequestsScreenDisplay);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});