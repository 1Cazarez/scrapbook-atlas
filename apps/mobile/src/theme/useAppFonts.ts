import { useFonts } from 'expo-font';
import { Caveat_500Medium, Caveat_700Bold } from '@expo-google-fonts/caveat';
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_800ExtraBold,
} from '@expo-google-fonts/bricolage-grotesque';

/**
 * Loads the two families named in CLAUDE.md. The keys must match the names in
 * the shared `fonts` token so a style can reference either source.
 */
export function useAppFonts() {
  const [loaded, error] = useFonts({
    Caveat_500Medium,
    Caveat_700Bold,
    BricolageGrotesque_400Regular,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_800ExtraBold,
  });

  return { loaded, error };
}
