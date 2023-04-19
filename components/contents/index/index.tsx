import Layout from "@/components/Layout";

import Footer from "@/components/Footer";
import Header from "./Header/Header";

export default function IndexContent() {
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
