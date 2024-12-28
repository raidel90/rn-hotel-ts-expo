import { StyleSheet } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface DashboardItemProps {
  title: string;
  icon: IconSource;
  value: number;
  onPress: () => void;
}
export const DashboardItem = ({ title, icon, value, onPress }: DashboardItemProps) => {
  return <Card style={styles.card}>
    <Card.Title title={title} />
    <Card.Content style={styles.content}>
      <IconButton icon={icon} size={40} onPress={onPress} />
      <Text style={styles.text}>{value}</Text>
    </Card.Content>
  </Card>;
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    margin: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
});