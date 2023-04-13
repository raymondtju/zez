import clsx from "clsx";
import Layout from "./Layout";

const Footer = () => {
  return (
    <div
      className={clsx(
        "bg-primary text-white",
        "dark:bg-zinc-100 dark:text-zinc-900"
      )}
    >
      <Layout>
        <footer className="flex items-center py-6 text-zinc-100 dark:text-zinc-900">
          <span className="font-bold ">&copy;2023, Raymond Tju</span>
        </footer>
      </Layout>
    </div>
  );
};

export default Footer;
