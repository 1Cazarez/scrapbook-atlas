import { describe, expect, it } from 'vitest';
import { colors, fonts, MIN_TOUCH_TARGET, TABLET_MIN_WIDTH } from '../index';

describe('design tokens', () => {
  it('exposes every colour named in CLAUDE.md as a 6-digit hex value', () => {
    expect(Object.keys(colors).sort()).toEqual([
      'accent',
      'cream',
      'desk',
      'gold',
      'ink',
      'kraft',
      'night',
    ]);
    for (const [name, value] of Object.entries(colors)) {
      expect(value, name).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('keeps the accessibility and layout thresholds the spec requires', () => {
    expect(MIN_TOUCH_TARGET).toBe(44);
    expect(TABLET_MIN_WIDTH).toBe(768);
  });

  it('names a handwriting and a UI family', () => {
    expect(fonts.handwriting.bold).toContain('Caveat');
    expect(fonts.ui.regular).toContain('BricolageGrotesque');
  });
});
