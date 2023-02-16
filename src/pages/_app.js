import { Plus_Jakarta_Sans } from "@next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";

const pjsfont = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`${pjsfont.className} min-h-screen bg-gradient-to-br from-slate-100 to-transparent selection:bg-gray-500 selection:text-white`}
    >
      <Layout>
        <Navbar />
      </Layout>
      <Component {...pageProps} />
    </div>
  );
}
