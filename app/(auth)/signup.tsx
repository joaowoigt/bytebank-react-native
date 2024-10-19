import { View, Text, Button, TextInput } from 'react-native';
import { Link } from 'expo-router';

export default function Signup() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign Up</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, marginBottom: 16, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginBottom: 16, padding: 8 }} />
      <Button title="Sign Up" onPress={() => {}} />
      <Link href="/login" style={{ marginTop: 16 }}>Already have an account? Log in</Link>
    </View>
  );
}