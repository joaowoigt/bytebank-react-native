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
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
    const newValueParsed = parseFloat(newValue!) / 100;
    if (
      newValueParsed === transaction.valueNumber &&
      newType === transaction.type
    ) {
      ToastAndroid.show(
        "Altere os valores para poder editar!!",
        ToastAndroid.SHORT
      );
      return;
    }
    const success = editTransaction(
      UID,
      transaction.id,
      newValueParsed,
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
        <Pressable style={styles.close} onPress={() => onClose()}>
          <FontAwesome name="close" size={24} color="#004D61" />
        </Pressable>

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
  close: {
    width: "100%",
    alignItems: "flex-start",
  },
});
