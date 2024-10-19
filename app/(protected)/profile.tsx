import { router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Profile Page</Text>
      <Button title="Logout" onPress={() => { router.replace('/(auth)/login') }} />
    </View>
  );
}