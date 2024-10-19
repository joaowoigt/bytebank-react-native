import { View, Text } from 'react-native';
import { Slot, useRouter } from 'expo-router';

export default function ProtectedLayout() {
  const isAuthenticated = true; // Mocked authentication, always true

  if (!isAuthenticated) {
    const router = useRouter();
    router.replace('/login');
    return null;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>Protected Layout</Text>
      <Slot />
    </View>
  );
}