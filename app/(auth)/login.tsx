import { View, Text, Button, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, marginBottom: 16, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginBottom: 16, padding: 8 }} />
      <Button title="Login" onPress={() => { router.replace('/(protected)/profile') }} />
      <Link href="/signup" style={{ marginTop: 16 }}>Don't have an account? Sign up</Link>
    </View>
  );
}