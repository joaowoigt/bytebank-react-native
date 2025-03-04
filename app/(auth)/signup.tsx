import { View, Text, Button, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign Up</Text>

      <TextInput
        placeholder="Nome"
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 16, padding: 8 }}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Sign Up"
        onPress={() => {
          signup(email, password, name);
        }}
      />
      <Link href="/login" style={{ marginTop: 16 }}>
        Already have an account? Log in
      </Link>
    </View>
  );
}
