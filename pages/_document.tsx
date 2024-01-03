import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { env } from "process";

const isProd = env["NODE_ENV"] === "production";
const GA_MEASUREMENT_ID = env["GA_MEASUREMENT_ID"] || "G-7DKV1ZD8WE";
const GA_TRACKING_ENABLED = (env["GA_TRACKING_ENABLED"] || "0") == "1";

export default function Document() {
  // console.log("isProd?", isProd, GA_TRACKING_ENABLED);
  return (
    <Html>
      <Head>
        {
          //#region Google Analytics Tracking
        }
        {GA_TRACKING_ENABLED && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        )}
        {GA_TRACKING_ENABLED && (
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        )}
        {
          //#endregion
        }
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
