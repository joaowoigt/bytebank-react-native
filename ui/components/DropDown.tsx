import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

export default function DropDown({
  items,
  selectedValue,
  setSelectedValue,
}: {
  items: { label: string; value: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}) {
  return (
    <View
      style={{
        width: "100%",
        borderWidth: 2,
        borderColor: "#004D61",
        borderRadius: 8,
        backgroundColor: "white",
        marginVertical: 32,
      }}
    >
      <Picker
        style={{
          width: "100%",
        }}
        dropdownIconColor={"#004D61"}
        dropdownIconRippleColor="#CBCBCB"
        selectedValue={selectedValue}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </View>
  );
}
