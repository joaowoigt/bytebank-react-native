import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/ui/components/Button";
import { textStyles } from "@/ui/styles/TextStyles";
import SignInImage from "@/assets/svg/signInImage";
import Logo from "@/assets/svg/logo";

export default function Signup() {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.mainContainer}>
      <Text style={textStyles.headerPrimary}>Cadastre-se!</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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

      <Button
        title="Finalizar cadastro"
        onPress={() => {
          signup(email, password, name);
        }}
      />
      <Link href="/login" style={{ marginTop: 16 }}>
        Ja tem uma conta? Acesse o app!!
      </Link>
      <SignInImage />
      <Logo />
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
});
