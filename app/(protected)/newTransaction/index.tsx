import NewTransactionImage from "@/assets/svg/newTransaction";
import { useAuth } from "@/context/AuthContext";
import { useTransaction } from "@/context/TransactionContext";
import Button from "@/ui/components/Button";
import CurrencyInputComponent from "@/ui/components/CurrencyInput";
import DropDown from "@/ui/components/DropDown";
import { dropDownItems } from "@/ui/data/DropDownItems";
import { textStyles } from "@/ui/styles/TextStyles";
import { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";

export default function NewTransaction() {
  const [selectedType, setSelectedType] = useState(
    "Selecione o tipo da transação"
  );
  const { addTransactions } = useTransaction();
  const { UID } = useAuth();
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");
  const createNewTransaction = () => {
    if (
      selectedType === "none" ||
      selectedValue === "" ||
      selectedValue === "0"
    ) {
      ToastAndroid.show(
        "Preencha todos os campos corretamente",
        ToastAndroid.SHORT
      );
      return;
    }
    const success = addTransactions(
      UID,
      parseFloat(selectedValue!) / 100,
      selectedType
    );
    if (success) {
      setSelectedValue("");
      setSelectedType("Selecione o tipo da transação");
      ToastAndroid.show("Transação realizada com sucesso", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        "Algo deu errado tente novamente mais tarde!",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={textStyles.header}>Nova transação</Text>
      <DropDown
        items={dropDownItems}
        selectedValue={selectedType}
        setSelectedValue={setSelectedType}
      />
      <Text style={textStyles.large}>Valor</Text>
      <CurrencyInputComponent
        value={selectedValue}
        setValue={setSelectedValue}
      />
      <Button
        title="Concluir transação"
        onPress={() => createNewTransaction()}
      />
      <NewTransactionImage />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#CBCBCB",
    borderRadius: 8,
    marginTop: 16,
  },
});
