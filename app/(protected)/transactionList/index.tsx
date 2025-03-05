import { useAuth } from "@/context/AuthContext";
import { useTransaction } from "@/context/TransactionContext";
import Button from "@/ui/components/Button";
import DropDown from "@/ui/components/DropDown";
import TransactionItem from "@/ui/components/TransactionItem";
import { textStyles } from "@/ui/styles/TextStyles";
import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

const dropDownItems = [
  { label: "Todas", value: "all" },
  { label: "Debito", value: "debit" },
  { label: "Credito", value: "credit" },
];

export default function TransactionList() {
  const { getFilteredList, editTransaction } = useTransaction();
  const { UID } = useAuth();
  const [fillter, setFillter] = useState("all");

  let filteredList = getFilteredList(fillter);
  return (
    <View style={styles.mainContainer}>
      <Text style={textStyles.headerPrimary}>Extrato</Text>
      <DropDown
        items={dropDownItems}
        selectedValue={fillter}
        setSelectedValue={setFillter}
      />
      {filteredList.map((transaction) => (
        <TransactionItem {...transaction} key={transaction.id} />
      ))}
      <Button
        title="editar"
        onPress={() => {
          editTransaction(UID, 1, 666, "credit");
        }}
      />
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
