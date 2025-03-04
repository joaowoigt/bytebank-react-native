import { View, Text } from "react-native";
import { Slot } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#E4EDE3",
      }}
    >
      <Slot />
    </View>
  );
}
