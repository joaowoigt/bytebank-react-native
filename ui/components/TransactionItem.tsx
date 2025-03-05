import { Transaction } from "@/domain/models/Transaction";
import { Text, View, StyleSheet } from "react-native";

export default function TransactionItem(transaction: Transaction) {
  const typeFormatted = transaction.type === "debit" ? "Débito" : "Crédito";
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.monthText}>{transaction.month}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.body}>{typeFormatted}</Text>
        <Text style={styles.body}>{transaction.fullDate}</Text>
      </View>
      <Text style={styles.bodyBold}>{transaction.formattedValue}</Text>
      <View style={styles.divider}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
  bodyBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    width: "80%",
    backgroundColor: "#004D61",
    marginTop: 8,
  },
});
