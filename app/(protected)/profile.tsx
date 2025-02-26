import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import { useTransaction } from "@/context/TransactionContext";

export default function Profile() {
  const { logout } = useAuth();
  const { getTransactions, transactions } = useTransaction();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Profile Page</Text>
      <Button
        title="Logout"
        onPress={() => {
          getTransactions("QJPtNiKdBqXvbTipBbICq9Nj2ff1");
        }}
      />
      <Button
        title="Print transactions"
        onPress={() => {
          console.log("Transactions: ", transactions);
        }}
      />
    </View>
  );
}
