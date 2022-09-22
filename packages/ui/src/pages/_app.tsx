import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";

import { Layout } from "../components/Layout/Layout";
import { globalStyles } from "../styles/global/global-styles";
import { themes } from "../styles/stitches.config";

import "react-multi-carousel/lib/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        dark: themes.dark.className,
        light: themes.light.className,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
