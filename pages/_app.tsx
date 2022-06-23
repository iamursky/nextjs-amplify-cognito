import "../styles/globals.css";

import type { AppProps } from "next/app";

import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { useEffect } from "react";

Amplify.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Amplify.configure(awsExports);
  }, []);

  return <Component {...pageProps} />;
}
