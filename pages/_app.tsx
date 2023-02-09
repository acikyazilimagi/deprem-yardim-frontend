import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { SnackbarProvider } from "@/components/base/Snackbar";
import Head from "next/head";
import { IntlProvider } from "react-intl";
import tr from "../translation/tr.json";
import en from "../translation/en.json";
import { useRouter } from "next/router";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
interface Locales {
  tr: any;
  en: any;
  [key: string]: any;
}
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function MyApp(props: MyAppProps) {
  const locales: Locales = {
    tr,
    en,
  };
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { locale } = useRouter();
  const localeString: string | undefined = locale;
  const messages = locales[localeString || "tr"] as { [key: string]: string };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <IntlProvider locale={localeString || "tr"} messages={messages}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </IntlProvider>
    </CacheProvider>
  );
}
