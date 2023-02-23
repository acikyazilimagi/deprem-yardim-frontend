import "@/styles/global.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
import { createEmotionCache } from "../utils/createEmotionCache";
import { SnackbarProvider } from "@/components/Snackbar/Snackbar";
import { appWithTranslation } from "next-i18next";
import { usePersistentLanguage } from "@/hooks/usePersistentLangauge";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  usePersistentLanguage();

  return (
    <ErrorBoundary>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
