import { ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Welcome from "./balance";

export default function Profile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, padding: 16, height: "100%" }}
        edges={["top"]}
      >
        <ScrollView>
          <Welcome />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
