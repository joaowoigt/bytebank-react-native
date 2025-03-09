import { Transaction } from "@/domain/models/Transaction";
import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, ToastAndroid } from "react-native";
import { textStyles } from "@/ui/styles/TextStyles";
import CurrencyInputComponent from "./CurrencyInput";
import Button from "./Button";
import { dropDownItems } from "../data/DropDownItems";
import DropDown from "./DropDown";
import { useAuth } from "@/context/AuthContext";
import { useTransaction } from "@/context/TransactionContext";

export default function EditModal({
  transaction,
  onClose,
}: {
  transaction: Transaction;
  onClose: () => void;
}) {
  const dropDownItemsForEdit = dropDownItems.filter(
    (item) => item.value != "none"
  );
  const { UID } = useAuth();
  const { editTransaction } = useTransaction();
  const [newValue, setNewValue] = useState<string | undefined>(
    transaction.formattedValue
  );
  const [newType, setNewType] = useState(transaction.type);
  const finishEditTransaction = () => {
    if (newValue === "" || newValue === "0") {
      ToastAndroid.show(
        "Preencha todos os campos corretamente",
        ToastAndroid.SHORT
      );
      return;
    }
    const success = editTransaction(
      UID,
      transaction.id,
      parseFloat(newValue!) / 100,
      newType
    );
    if (success) {
      ToastAndroid.show("Transação editada com sucesso", ToastAndroid.SHORT);
      onClose();
    } else {
      ToastAndroid.show(
        "Algo deu errado tente novamente mais tarde!",
        ToastAndroid.SHORT
      );
    }
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={textStyles.headerPrimary}>Editar transação</Text>
        <CurrencyInputComponent value={newValue} setValue={setNewValue} />
        <DropDown
          items={dropDownItemsForEdit}
          selectedValue={newType}
          setSelectedValue={setNewType}
        />
        <Button
          title="Editar!"
          onPress={() => {
            finishEditTransaction();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#CBCBCB",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
