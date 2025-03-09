import { getFullDate } from "@/domain/mappers/transactionMappers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, StyleSheet } from "react-native";
import { useTransaction } from "@/context/TransactionContext";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { textStyles } from "@/ui/styles/TextStyles";
import BalanceImage from "@/assets/svg/balance";

export default function Welcome() {
  const { balance, getTransactions } = useTransaction();
  const { UID, displayName } = useAuth();
  const date = new Date();
  const fullDate = getFullDate(date.toISOString());
  useEffect(() => {
    getTransactions(UID);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={textStyles.header}>Olá, {displayName}! :)</Text>
      <Text style={textStyles.small}>{fullDate}</Text>
      <View style={styles.secondaryContainer}>
        <View style={styles.rowContainer}>
          <Text style={textStyles.large}>Saldo</Text>
          <AntDesign
            name="eyeo"
            style={{ marginTop: 20, marginStart: 32 }}
            size={24}
            color="white"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={textStyles.body}>Conta corrente</Text>
        <Text style={textStyles.large}>{balance}</Text>
      </View>
      <BalanceImage />
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    backgroundColor: "white",
    width: "50%",
    height: 2,
    marginVertical: 16,
  },
});
