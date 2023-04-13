import Layout from "@/components/Layout";
import Header from "./header/Header";

import clsx from "clsx";
import Footer from "@/components/Footer";

export default function IndexContent() {
  // const texts = `kraa.cc kraa.cc kraa.cc kraa.cc`;
  return (
    <>
      <Layout>
        <Header />
      </Layout>

      <div className="mt-40">
        <Footer />
      </div>
    </>
  );
}
