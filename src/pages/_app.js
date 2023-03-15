import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { store } from "@/state/store";
// import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { LazyMotion, domAnimation } from "framer-motion";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <LazyMotion features={domAnimation}>
          <Navbar />
          <Component {...pageProps} />
        </LazyMotion>
      </Provider>
    </>
  );
}
