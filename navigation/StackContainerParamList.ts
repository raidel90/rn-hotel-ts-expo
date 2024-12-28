import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabContainerParamList } from "./TabContainerParamList";

export type StackContainerParamList = {
  ClockIn: undefined;
  Dashboard: undefined;
  Tab: NavigatorScreenParams<TabContainerParamList>;
  RoomDetail: {
    roomNumber: string;
  };
  RequestDetail: undefined;
  TaskDetail: undefined;
  AlertDetail: {
    alertId: string;
  };
};

export type StackContainerScreenProps<S extends keyof StackContainerParamList> =
  NativeStackScreenProps<StackContainerParamList, S>;