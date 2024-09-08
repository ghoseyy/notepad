import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [note, setNote] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem('note', note);
      Alert.alert('Note saved locally!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Failed to save the note.', errorMessage);
    }
  };

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem('note');
      if (savedNote !== null) {
        setNote(savedNote);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Failed to load the note.', errorMessage);
    }
  };

  const clearNote = () => {
    setNote('');
    AsyncStorage.removeItem('note');
  };

  const downloadNote = async () => {
    try {
      // Define the file URI with a .txt extension
      const fileUri = FileSystem.documentDirectory + 'note.txt';

      // Write the note content to the file with proper encoding
      await FileSystem.writeAsStringAsync(fileUri, note, { encoding: FileSystem.EncodingType.UTF8 });

      // Check if sharing is available on the platform
      if (await Sharing.isAvailableAsync()) {
        // Share the file with proper mimeType for text
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Save note as...',
        });
      } else {
        Alert.alert('Sharing is not available on this platform.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Failed to download the note.', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.toolbar}>
        <Button title="Save Note" onPress={saveNote} />
        <Button title="Clear Note" onPress={clearNote} />
        <Button title="Download Note" onPress={downloadNote} />
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="Write your note here..."
        value={note}
        onChangeText={text => setNote(text)}
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
    justifyContent: 'flex-start',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
