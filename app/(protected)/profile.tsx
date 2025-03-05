import { ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Welcome from "./balance";
import NewTransaction from "./newTransaction";

export default function Profile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, padding: 16, height: "100%" }}
        edges={["top"]}
      >
        <ScrollView>
          <Welcome />
          <NewTransaction />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
