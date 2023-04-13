import Layout from "@/components/Layout";
import Header from "./header/Header";

import clsx from "clsx";

export default function IndexContent() {
  // const texts = `kraa.cc kraa.cc kraa.cc kraa.cc`;
  return (
    <>
      <Layout>
        <Header />
      </Layout>

      <footer
        className={clsx(
          "mt-40 bg-primary text-white",
          "dark:bg-zinc-100 dark:text-zinc-900"
        )}
      >
        <Layout>
          <nav className="flex items-center py-6 text-zinc-100 dark:text-zinc-900">
            <span className="text-xl font-bold">&copy;2023, Raymond Tju</span>
          </nav>
        </Layout>
      </footer>
    </>
  );
}
