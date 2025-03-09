import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/ui/components/Button";
import { textStyles } from "@/ui/styles/TextStyles";
import Logo from "@/assets/svg/logo";
import BalanceImage from "@/assets/svg/balance";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.mainContainer}>
      <BalanceImage />
      <Text style={textStyles.headerPrimary}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.bottomContainer}>
        <Button
          title="Acessar"
          onPress={() => {
            const isAuthenticated = login(email, password);
            if (isAuthenticated) {
              router.replace("/(protected)/dashboard");
            }
          }}
        />
        <Link href="/signup" style={{ marginTop: 16 }}>
          Ainda não tem uma conta? Cadastre-se!
        </Link>
        <Logo style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#CBCBCB",
  },
  input: {
    borderWidth: 1,
    marginVertical: 16,
    padding: 8,
    width: "100%",
    borderColor: "#004D61",
    borderRadius: 8,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 64,
  },
});
