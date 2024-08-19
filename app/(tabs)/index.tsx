import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App() {
  const [note, setNote] = useState('');

  useEffect(() => {
    loadNote();
  }, []);

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem('note', note);
      alert('Note saved locally!');
    } catch (error) {
      alert('Failed to save the note.');
    }
  };

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem('note');
      if (savedNote !== null) {
        setNote(savedNote);
      }
    } catch (error) {
      alert('Failed to load the note.');
    }
  };

  const clearNote = () => {
    setNote('');
    AsyncStorage.removeItem('note');
  };

  const downloadNote = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'note.txt';
      await FileSystem.writeAsStringAsync(fileUri, note);
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Save note as...',
        });
      } else {
        alert('Sharing is not available on this platform.');
      }
    } catch (error) {
      alert('Failed to download the note.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Button title="Save" onPress={saveNote} />
        <Button title="Clear" onPress={clearNote} />
        <Button title="Download" onPress={downloadNote} />
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="Start typing your note here..."
        value={note}
        onChangeText={(text) => setNote(text)}
        multiline={true}
      />
      <StatusBar style={Platform.OS === 'web' ? 'auto' : 'light'} />
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