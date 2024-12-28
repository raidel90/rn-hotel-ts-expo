import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlertDetailScreen } from '../alerts/AlertDetailScreen';
import { ClockInScreen } from '../home/ClockInScreen';
import { DashboardScreen } from '../home/DashboardScreen';
import { RequestDetailScreen } from '../requests/RequestDetailScreen';
import { RoomDetailScreen } from '../rooms/RoomDetailScreen';
import { TaskDetailScreen } from '../tasks/TaskDetailScreen';
import { StackContainerParamList } from './StackContainerParamList';
import { TabContainer } from './TabContainer';

const Stack = createNativeStackNavigator<StackContainerParamList>();

export const StackContainer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ClockIn" component={ClockInScreen}
        options={{
          title: "Clock In",
          headerShown: false
        }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen}
        options={{
          title: "Dashboard",
          headerShown: false
        }} />
      <Stack.Screen name="Tab" component={TabContainer}
        options={{
          title: "Monster Hotel",
        }} />
      <Stack.Screen name="RoomDetail" component={RoomDetailScreen}
        options={{
          title: "Room Detail",
        }} />
      <Stack.Screen name="RequestDetail" component={RequestDetailScreen}
        options={{
          title: "Request Detail",
        }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen}
        options={{
          title: "Task Detail",
        }} />
      <Stack.Screen name="AlertDetail" component={AlertDetailScreen}
        options={{
          title: "Alert Detail",
        }} />
    </Stack.Navigator>
  );
};