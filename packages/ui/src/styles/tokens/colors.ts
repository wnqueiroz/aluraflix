import {
  grayDark,
  blueDark,
  gray,
  blue,
  whiteA,
  blackA,
} from "@radix-ui/colors";
import { ThemesTypes } from "../stitches.config";

type Colors = "primary" | "secondary" | "natural";

type ColorsTypes = {
  [key in Colors]: {
    [key in string]: string;
  };
};

const themes: { [key in ThemesTypes]: ColorsTypes } = {
  light: {
    primary: blue,
    secondary: gray,
    natural: gray,
  },
  dark: {
    primary: blueDark,
    secondary: grayDark,
    natural: grayDark,
  },
};

const makeColors = (theme: ThemesTypes) => {
  const palette = themes[theme];

  const base = {
    "black-01": blackA.blackA1,
    "black-06": blackA.blackA6,
    "black-12": blackA.blackA12,

    "white-01": whiteA.whiteA1,
    "white-06": whiteA.whiteA6,
    "white-12": whiteA.whiteA12,
  };

  const text = {
    "text-contrast-high": palette.natural.slate12,
    "text-contrast-low": palette.natural.slate11,
    "text-natural": palette.natural.slate1,
    "text-black": blackA.blackA12,
    "text-white": whiteA.whiteA12,
  };

  const primary = {
    "primary-01": palette.primary.blue1,
    "primary-02": palette.primary.blue2,
    "primary-03": palette.primary.blue3,
    "primary-04": palette.primary.blue4,
    "primary-05": palette.primary.blue5,
    "primary-06": palette.primary.blue6,
    "primary-07": palette.primary.blue7,
    "primary-08": palette.primary.blue8,
    "primary-09": palette.primary.blue9,
    "primary-10": palette.primary.blue10,
    "primary-11": palette.primary.blue11,
    "primary-12": palette.primary.blue12,
  };

  const secondary = {
    "secondary-01": palette.secondary.cyan1,
    "secondary-02": palette.secondary.cyan2,
    "secondary-03": palette.secondary.cyan3,
    "secondary-04": palette.secondary.cyan4,
    "secondary-05": palette.secondary.cyan5,
    "secondary-06": palette.secondary.cyan6,
    "secondary-07": palette.secondary.cyan7,
    "secondary-08": palette.secondary.cyan8,
    "secondary-09": palette.secondary.cyan9,
    "secondary-10": palette.secondary.cyan10,
    "secondary-11": palette.secondary.cyan11,
    "secondary-12": palette.secondary.cyan12,
  };

  return {
    ...primary,
    ...secondary,
    ...base,
    ...text,
  };
};

export const colors = {
  light: makeColors("light"),
  dark: makeColors("dark"),
};
