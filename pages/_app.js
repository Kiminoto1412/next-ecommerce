import "@/styles/globals.css";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  // fix material ui server side rendering(SSR)
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return <Component {...pageProps} />;
}
