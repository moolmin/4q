import { ReactNode } from "react";
import "./global.css";
import "antd/dist/reset.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import { Metadata } from "next";
import Head from "next/head";
import Header from "./(layouts)/header";
import styles from "./layout.module.css";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import { GoogleTagManager } from "@next/third-parties/google";
import localFont from 'next/font/local'
import { UserProvider } from "@/context/UserContext";

const spoqaHanSansNeo = localFont({
  src: [
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/SpoqaHanSansNeo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-spoqaHanSansNeo",
});


export const metadata: Metadata = {
  robots: { index: true, follow: true },
  metadataBase: new URL("https://qqqq.world"),
  openGraph: {
    images: [
      {
        url: "/images/logo.png",
        alt: "4Q",
      },
    ],
  },
  title: {
    template: "4Q | %s",
    default: "4Q | 쉽고 빠른 포토큐알 생성",
  },
  description: "포토 큐알 자동 생성 서비스",
  icons: {
    icon: "/favicon.png",
  },
  other: {
    "google-site-verification": "KFttRlDkuToG6aJCc_N29w2ksid-21rcB4YumaCXYVg",
  },
};

const config: ThemeConfig = {
  token: {
    colorPrimary: "#FF5B0F",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={spoqaHanSansNeo.className}> {/* 폰트 적용 */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, 
          user-scalable=0"
        />
        <meta property="og:site_name" content="4Q"></meta>
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:title" content="4Q | 쉽고 빠른 포토큐알 생성" />
        <meta
          name="google-site-verification"
          content="KFttRlDkuToG6aJCc_N29w2ksid-21rcB4YumaCXYVg"
        />
        <meta
          name="naver-site-verification"
          content="5f9af6b8b6bc643bb05b00139fef63e75e62d67c"
        />

        <meta
          httpEquiv="Cache-Control"
          content="no-store, no-cache, must-revalidate, max-age=0"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <GoogleTagManager gtmId="GTM-PG8QW8F5" />
      <GoogleAnalytics gaId="G-NX6HMP5K6H" />
      <body className={styles.container} suppressHydrationWarning>
        <UserProvider>
          <AntdRegistry>
            <ConfigProvider theme={config}>
              <Header />
              <div className={styles.bodyContainer}>{children}</div>
            </ConfigProvider>
          </AntdRegistry>
        </UserProvider>
      </body>
    </html>
  );
}
