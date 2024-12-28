import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackContainerParamList } from "./StackContainerParamList";

export type TabContainerParamList = {
  Rooms: undefined;
  Requests: undefined;
  Tasks: undefined;
  Alerts: undefined;
};

export type TabContainerScreenProps<S extends keyof TabContainerParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<TabContainerParamList, S>,
  NativeStackScreenProps<StackContainerParamList>
>;