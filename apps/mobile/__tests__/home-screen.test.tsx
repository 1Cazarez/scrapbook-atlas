import { colors, fonts } from '@scrapbook-atlas/shared';
import { render } from '@/test/render';
import HomeScreen from '../app/index';

describe('placeholder home screen', () => {
  it('renders the Milestone 0 placeholder', async () => {
    const { getByRole, getByText } = await render(<HomeScreen />);

    expect(getByRole('header', { name: 'Scrapbook Atlas' })).toBeOnTheScreen();
    expect(getByText('Once upon a time…')).toBeOnTheScreen();
  });

  it('draws the title in Caveat and the body in Bricolage Grotesque', async () => {
    const { getByText } = await render(<HomeScreen />);

    expect(getByText('Once upon a time…')).toHaveStyle({
      fontFamily: fonts.handwriting.bold,
      color: colors.gold,
    });
    expect(getByText(/The scaffold is up/)).toHaveStyle({
      fontFamily: fonts.ui.regular,
    });
  });

  it('labels every design token swatch for a screen reader', async () => {
    const { getByLabelText } = await render(<HomeScreen />);

    for (const [name, value] of Object.entries(colors)) {
      expect(getByLabelText(`${name}, ${value}`)).toBeOnTheScreen();
    }
  });
});
