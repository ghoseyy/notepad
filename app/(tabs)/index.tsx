import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Platform, Alert, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const { width } = useWindowDimensions();

  useEffect(() => {
    loadNote();
  }, []);

  const saveNote = async () => {
    if (fileName.trim() === '') {
      Alert.alert('Error', 'Please enter a file name.');
      return;
    }
    try {
      await AsyncStorage.setItem('note', note);
      await AsyncStorage.setItem('fileName', fileName);
      Alert.alert('Success', 'Note saved locally!');
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem('note');
      const savedFileName = await AsyncStorage.getItem('fileName');
      if (savedNote !== null) {
        setNote(savedNote);
      }
      if (savedFileName !== null) {
        setFileName(savedFileName);
      }
    } catch (error) {
      console.error('Error loading note:', error);
      Alert.alert('Error', 'Failed to load the note: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const clearNote = () => {
    setNote('');
    setFileName('');
    AsyncStorage.removeItem('note');
    AsyncStorage.removeItem('fileName');
  };

  const downloadNote = async () => {
    if (fileName.trim() === '') {
      Alert.alert('Error', 'Please enter a file name.');
      return;
    }
    try {
      if (Platform.OS === 'web') {
        const blob = new Blob([note], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        Alert.alert('Success', 'Note download initiated!');
      } else {
        const fileUri = `${FileSystem.documentDirectory}${fileName}.txt`;
        await FileSystem.writeAsStringAsync(fileUri, note, { encoding: FileSystem.EncodingType.UTF8 });
        if (!(await Sharing.isAvailableAsync())) {
          throw new Error('Sharing is not available on this platform');
        }
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/plain',
          dialogTitle: 'Save note as...',
          UTI: 'public.plain-text'
        });
        Alert.alert('Success', 'Note downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading note:', error);
      Alert.alert('Error', 'Failed to download the note: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, width < 600 && styles.headerMobile]}>
        <TextInput
          style={[styles.fileNameInput, width < 600 && styles.fileNameInputMobile]}
          placeholder="Enter file name"
          value={fileName}
          onChangeText={setFileName}
        />
        <View style={[styles.buttonContainer, width < 600 && styles.buttonContainerMobile]}>
          <TouchableOpacity style={styles.button} onPress={saveNote}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearNote}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={downloadNote}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.textArea}
        placeholder="Write your note here..."
        value={note}
        onChangeText={setNote}
        multiline={true}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  fileNameInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
  fileNameInputMobile: {
    marginRight: 0,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonContainerMobile: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});