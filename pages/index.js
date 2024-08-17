import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome to the Notepad App</Text>
      <Button title="Go to Notes" onPress={() => router.push('/NoteScreen')} />
    </View>
  );
}
