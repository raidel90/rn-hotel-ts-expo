import { SafeAreaView, StyleSheet, Text } from "react-native";

export const TasksScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Tasks Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
  }
});