import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { View, Text, Button, ScrollView } from "react-native";
import { useTransaction } from "@/context/TransactionContext";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Welcome from "./balance";

export default function Profile() {
  const { logout } = useAuth();
  const { getTransactions, transactions, addTransactions } = useTransaction();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, padding: 16, height: "100%" }}
        edges={["top"]}
      >
        <ScrollView>
          <Welcome balance={0} name="User" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
