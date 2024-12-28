import { StyleSheet, View } from "react-native";
import { HelperText } from "react-native-paper";

export function ErrorScreen({ error }: { error: any }) {
  return (
    <View style={styles.container}>
      <HelperText
        type="error"
        style={styles.text}>
          {error.message || error}
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 28,
  }
});