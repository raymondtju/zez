import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import Container from "@/components/container";
import Navbar from "@/components/navbar";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();

  return (
    <main>
      <Navbar session={session} />
      <Container>
        <h1 className="mt-8 text-2xl font-bold tracking-tighter">
          public links
        </h1>
        {children}
      </Container>
    </main>
  );
}

export default Layout;
