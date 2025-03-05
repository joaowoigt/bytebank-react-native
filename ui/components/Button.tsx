import { TouchableOpacity, Text } from "react-native";

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#004D61",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        width: "70%",
        alignItems: "center",
        marginVertical: 16,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: 24 }}>{title}</Text>
    </TouchableOpacity>
  );
}
