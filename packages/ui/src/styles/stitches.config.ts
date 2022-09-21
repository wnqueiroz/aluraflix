import { createStitches } from '@stitches/react';
import type * as Stitches from '@stitches/react';

import {
  borders,
  fonts,
  sizes,
  spacings,
  transitions,
  zIndices,
  colors,
  utils,
  medias,
  shadows
} from './tokens';

export type CSS = Stitches.CSS<typeof config>;

export type ThemesTypes = 'dark' | 'light';

export type ColorTokensTypes = `$${keyof typeof colors.dark}`;

type CreateTheme = ReturnType<typeof createTheme>;

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme
} = createStitches({
  theme: {
    borderStyles: {},
    borderWidths: {},
    sizes: { ...sizes },
    space: { ...spacings },
    zIndices: { ...zIndices },
    colors: { ...colors.dark },
    shadows: { ...shadows.dark },
    fonts: { ...fonts.families },
    radii: { ...borders.radius },
    fontSizes: { ...fonts.sizes },
    transitions: { ...transitions },
    fontWeights: { ...fonts.weights },
    lineHeights: { ...fonts.lineHeights },
    letterSpacings: { ...fonts.letterSpacings }
  },
  utils: { ...utils },
  media: { ...medias }
});

export const themes: {
  [key in ThemesTypes]: CreateTheme;
} = {
  dark: createTheme({
    colors: colors.dark,
    shadows: shadows.dark
  }),
  light: createTheme({
    colors: colors.light,
    shadows: shadows.light
  })
};
