import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import Container from "@/components/container";
import Navbar from "@/components/navbar";
import Links from "@/components/pages/links/links";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentUser();
  if (!session) redirect("/siginin");

  return (
    <main>
      <Navbar session={session} />
      <Container>
        <div className="mt-12 flex w-full gap-4">
          <Links />
          {children}
        </div>
      </Container>
    </main>
  );
}

export default Layout;
