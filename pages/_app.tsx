import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { store } from "@/state/store";
import { Provider } from "react-redux";
import { LazyMotion, domAnimation } from "framer-motion";
import { GetServerSideProps } from "next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <LazyMotion features={domAnimation}>
          <Component {...pageProps} />
        </LazyMotion>
      </Provider>
    </>
  );
}
