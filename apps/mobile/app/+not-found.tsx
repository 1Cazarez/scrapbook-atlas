import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, space } from '@/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.screen}>
        <Text style={styles.title}>This page fell out of the book.</Text>
        <Link href="/" style={styles.link} accessibilityRole="link">
          Back to the beginning
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.md,
    padding: space.lg,
    backgroundColor: colors.desk,
  },
  title: {
    fontFamily: fonts.handwriting.bold,
    fontSize: 32,
    textAlign: 'center',
    color: colors.cream,
  },
  link: {
    fontFamily: fonts.ui.semibold,
    fontSize: 16,
    color: colors.accent,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    minHeight: 44,
  },
});
