import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, Text, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/banner.svg')}
            style={styles.headerImage}  // Correct usage of the style
          />
          <Text style={styles.headerText}>Hello,<br></br>welcome to my test page</Text> {/* Foreground text */}
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Info</ThemedText>
      </ThemedView>
      <ThemedText>K cha ta halkhabar</ThemedText>
      <Collapsible title="Name">
        <ExternalLink href="https://bimql.link/">
          <ThemedText type="link">Bimql</ThemedText> <ThemedText type="link">Chhetry</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Number">
        <ExternalLink href="mailto:bimal.chhetry122@gmail.com">
          <ThemedText> Find me here </ThemedText>
          <ThemedText type="link">Mail</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Address">
        <ThemedText> Find My IP</ThemedText>
      </Collapsible>
      <Collapsible title="Links">
        <ExternalLink href="https://bimql.link/">
          <ThemedText type="link">Bimql</ThemedText> <ThemedText type="link">Chhetry</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Usages">
        <ThemedText>
          I always use Notepad on my device or online tools. Why not make my own tool to meet my needs, rather than depending on others?
        </ThemedText>
      </Collapsible>
      <Collapsible title="Copyright & Issues">
        <ThemedText>
          Copyright © 2024 Bimal Chhetry. All rights reserved.{' '}
          <ThemedText type="defaultSemiBold">bimql.vercel.app</ThemedText> is a product of Bimal Chhetry. All content and materials on this website, including but not limited to text, graphics, and logos, are the property of Bimal Chhetry and are protected by international copyright laws. You may not reproduce, distribute, or otherwise use any of the content from this website without explicit permission from Bimal Chhetry. Unauthorized use of the content may result in legal action. For permissions or inquiries, please contact us at{' '}
          <ThemedText type="defaultSemiBold">[your contact email]</ThemedText>.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    width: '100%', // Make sure the container takes full width
  },
  headerImage: {
    width: 1440,  // Set to your desired size
    height: 250,  // Set to your desired size
  },
  headerText: {
    position: 'absolute',
    top: 20,      // Adjust as needed
    left: 50,     // Adjust as needed
    color: 'white', // Text color
    fontFamily: 'poppins',
    fontSize: 24, // Adjust text size
    fontWeight: 'medium', // Adjust font weight
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
