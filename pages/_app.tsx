import "../styles/globals.css";

import type { AppProps } from "next/app";

import { Amplify } from "aws-amplify";
import { useEffect } from "react";

import awsExports from "../aws-exports";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Amplify.configure(awsExports);
  }, []);

  return <Component {...pageProps} />;
}
