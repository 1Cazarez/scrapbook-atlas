import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, space } from '@/theme';

/**
 * Milestone 0 placeholder. It exists to prove the development build boots with
 * both font families and the design tokens wired up; the paper map replaces it
 * in Milestone 1.
 */
export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + space.xl, paddingBottom: insets.bottom + space.xl },
      ]}
    >
      <Text style={styles.kicker} accessibilityRole="header">
        Scrapbook Atlas
      </Text>

      <Text style={styles.title}>Once upon a time…</Text>

      <View style={styles.card} accessible accessibilityRole="summary">
        <Text style={styles.cardLabel}>Milestone 0</Text>
        <Text style={styles.cardBody}>
          The scaffold is up. The paper world map arrives in Milestone 1.
        </Text>
      </View>

      <View style={styles.swatches} accessibilityRole="list">
        {(Object.entries(colors) as [keyof typeof colors, string][]).map(([name, value]) => (
          <View
            key={name}
            style={styles.swatch}
            accessibilityRole="text"
            accessibilityLabel={`${name}, ${value}`}
          >
            <View style={[styles.chip, { backgroundColor: value }]} />
            <Text style={styles.swatchName}>{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.desk,
  },
  content: {
    paddingHorizontal: space.lg,
    gap: space.lg,
  },
  kicker: {
    fontFamily: fonts.ui.semibold,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.kraft,
  },
  title: {
    fontFamily: fonts.handwriting.bold,
    fontSize: 52,
    lineHeight: 60,
    color: colors.gold,
  },
  card: {
    backgroundColor: colors.cream,
    borderRadius: 14,
    padding: space.md,
    gap: space.xs,
    borderStartWidth: 5,
    borderStartColor: colors.accent,
  },
  cardLabel: {
    fontFamily: fonts.ui.extrabold,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  cardBody: {
    fontFamily: fonts.ui.regular,
    fontSize: 16,
    lineHeight: 23,
    color: colors.ink,
  },
  swatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.md,
  },
  swatch: {
    alignItems: 'center',
    gap: space.xs,
    minWidth: 64,
  },
  chip: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.kraft,
  },
  swatchName: {
    fontFamily: fonts.ui.regular,
    fontSize: 12,
    color: colors.cream,
  },
});
