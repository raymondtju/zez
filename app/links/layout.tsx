import { getCurrentUser } from "@/lib/auth";
import Container from "@/components/container";
import Navbar from "@/components/navbar";
import Links from "@/components/pages/links/links";

async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser();
  if (!session) return null;
  return (
    <main>
      <Navbar session={session} />
      <Container>
        <div className="flex gap-4 mt-12 w-full">
          <Links /> 
          {children}
        </div>
      </Container>
    </main>
  );
}

export default Layout;
