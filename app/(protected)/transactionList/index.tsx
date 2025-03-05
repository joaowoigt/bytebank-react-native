import { useTransaction } from "@/context/TransactionContext";
import TransactionItem from "@/ui/components/TransactionItem";
import { textStyles } from "@/ui/styles/TextStyles";
import { Text, StyleSheet, View } from "react-native";

export default function TransactionList() {
  const { transactions } = useTransaction();
  return (
    <View style={styles.mainContainer}>
      <Text style={textStyles.headerPrimary}>Extrato</Text>
      {transactions.map((transaction) => (
        <TransactionItem {...transaction} key={transaction.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginTop: 16,
  },
});
