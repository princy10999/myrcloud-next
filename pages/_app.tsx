import "intro.js/introjs.css";
import "../public/assets/fonts/zing-icon-font/styles.css";
import "../public/assets/fonts/zinghr-theme.css";
import "../styles/globals.css";
import "../styles/singup.css";
import "../styles/partner.css";
import type { AppProps } from "next/app";
import { lightTheme, darkTheme } from "../src/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AlertProvider from "@providers/alertProvider";
// import en_US from "antd/lib/locale/en_US"
// import de_DE from "antd/lib/locale/de_DE"
import { appWithTranslation } from "next-i18next";
import { store } from "@redux/Redux/Store";
import { Provider } from "react-redux";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import localStoreUtil from "@redux/Api/localstore.util";
import { LOGIN_TOKEN } from "@redux/Api/AuthApi";
import { setToken } from "@redux/Api/ClientHelper";
import { NoSsr } from "@mui/material";
import Head from "next/head";
import AppCommonActionsWrapper from "@components/common/appCommonActionsWrapper";
import { ConfirmProvider } from "material-ui-confirm";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.pageTitle || "MyRcloud"}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content={lightTheme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico"></link>
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline enableColorScheme />
          <CacheProvider value={muiCache}>
            <NoSsr>
              {/* <AlertProvider> */}
              <ConfirmProvider
                defaultOptions={{
                  confirmationButtonProps: {
                    variant: "contained",
                  },
                  cancellationButtonProps: {
                    variant: "outlined",
                  },
                }}
              >
                <AppCommonActionsWrapper />
                <Component {...pageProps} />
              </ConfirmProvider>
              {/* </AlertProvider> */}
            </NoSsr>
          </CacheProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
