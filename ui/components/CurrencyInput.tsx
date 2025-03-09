import { MaskedTextInput } from "react-native-mask-text";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";

export default function CurrencyInputComponent({
  value,
  setValue,
}: {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <MaskedTextInput
      style={styles.input}
      type="currency"
      options={{
        prefix: "R$",
        decimalSeparator: ".",
        groupSeparator: ",",
        precision: 2,
      }}
      keyboardType="numeric"
      value={value}
      onChangeText={(formated, extracted) => {
        console.log("formated", formated, "extracted", extracted);
        setValue(extracted);
      }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 8,
    borderColor: "#004D61",
    padding: 8,
    marginVertical: 16,
    fontSize: 24,
  },
});
