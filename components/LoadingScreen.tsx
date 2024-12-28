import { StyleSheet } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

export function LoadingScreen() {
  return (
    <ActivityIndicator
      style={styles.container}
      size="large"
      animating={true}
      color={Colors.blue600}>

    </ActivityIndicator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});