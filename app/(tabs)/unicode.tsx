import React from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const UnicodeTab = () => {
  const handlePress = () => {
    Linking.openURL('https://www.ashesh.com.np/nepali-unicode.php');
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <iframe
          src="https://www.ashesh.com.np/linknepali-unicode3.php?api=0511y8o415"
          width="100%"
          height={800}
          frameBorder="0"
          scrolling="no"
          style={{ backgroundColor: 'transparent' }}  // Set transparent background
        />
      ) : (
        <WebView
          source={{ uri: 'https://www.ashesh.com.np/linknepali-unicode3.php?api=0511y8o415' }}
          style={{ flex: 1 }}
        />
      )}
      <Text style={styles.footerText}>
        © <Text
          style={styles.linkText}
          onPress={handlePress}>
          Nepali Unicode
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 8,
    color: 'gray',
    textAlign: 'center',
    marginTop: 5,
  },
  linkText: {
    textDecorationLine: 'none',
    color: 'gray',
  },
});

export default UnicodeTab;
