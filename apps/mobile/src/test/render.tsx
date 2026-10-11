import type { ReactElement, ReactNode } from 'react';
import { render as rntlRender } from '@testing-library/react-native';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

/** A fixed phone-sized frame, so insets never depend on the test host. */
const metrics: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

function Providers({ children }: { children: ReactNode }) {
  return <SafeAreaProvider initialMetrics={metrics}>{children}</SafeAreaProvider>;
}

/**
 * Renders a screen inside the providers the root layout supplies at runtime.
 *
 * React Native Testing Library 14 made `render` async, so callers must await
 * this and use the queries it resolves to.
 */
export function render(ui: ReactElement) {
  return rntlRender(ui, { wrapper: Providers });
}
