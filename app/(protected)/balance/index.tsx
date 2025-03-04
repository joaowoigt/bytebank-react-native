import { getFullDate } from "@/domain/mappers/transactionMappers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, StyleSheet } from "react-native";
import SvgComponent from "@/assets/svg/balance";
import { useTransaction } from "@/context/TransactionContext";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Welcome() {
  const { balance, transactions, getTransactions, addTransactions } =
    useTransaction();
  const { UID, displayName } = useAuth();
  const date = new Date();
  const fullDate = getFullDate(date.toISOString());
  useEffect(() => {
    getTransactions(UID);
    console.log(transactions);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Olá, {displayName}! :)</Text>
      <Text style={styles.dateText}>{fullDate}</Text>
      <View style={styles.secondaryContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.header}>Saldo</Text>
          <AntDesign
            name="eyeo"
            style={{ marginTop: 20, marginStart: 32 }}
            size={24}
            color="white"
          />
        </View>
        <View style={styles.divider}></View>
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
