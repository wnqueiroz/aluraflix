import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";

import { globalStyles } from "../styles/global/global-styles";
import { themes } from "../styles/stitches.config";
import { Layout } from "../components/Layout/Layout";

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
