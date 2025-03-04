import { getFullDate } from "@/domain/mappers/transactionMappers";
import { Theme } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "@shopify/restyle";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import SvgComponent from "@/assets/svg/balance";

export default function Welcome({
  balance,
  name,
}: {
  balance: number;
  name: string;
}) {
  const date = new Date();
  const fullDate = getFullDate(date.toISOString());
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Olá, {name}! :)</Text>
      <Text style={styles.dateText}>{fullDate}</Text>
      <View style={styles.secondaryContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.header}>Saldo</Text>
          <AntDesign
            name="eyeo"
            style={{ marginTop: 20, marginStart: 32 }}
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "50%",
            height: 2,
            marginVertical: 16,
          }}
        ></View>
        <Text style={styles.body}>Conta corrente</Text>
        <Text style={styles.header}>{balance}</Text>
      </View>
      <SvgComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#004D61",
    borderRadius: 8,
    width: "100%",
  },
  secondaryContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "50%",
    marginStart: "50%",
  },

  header: {
    fontSize: 24,
    color: "white",
    marginTop: 16,
  },
  dateText: {
    fontSize: 16,
    color: "white",
  },
  body: {
    fontSize: 20,
    color: "white",
  },
});
