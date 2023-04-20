import "@/styles/globals.css";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import { LazyMotion, domAnimation } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <LazyMotion features={domAnimation}>
          <Component {...pageProps} />
          <Analytics />
        </LazyMotion>
      </Provider>
    </>
  );
}
