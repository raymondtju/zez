
import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/navbar";
import Container from "@/components/container";

import PublicLinks from "@/components/pages/public-links";

export type PublicLinksProps = {
  key: string;
  val: string;
  exp: number;
};

async function getPublicLinks() {
  const get = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/links/api?type=public`
  );
  return get.json();
}

async function Page() {
  const session = await getCurrentUser();
  const data = await getPublicLinks();

  return (
    <>
      <main>
        <Navbar session={session} />
        <Container>
          <h1 className="mt-8 text-2xl font-bold tracking-tighter">
            public links
          </h1>

          <PublicLinks data={data} />
        </Container>
      </main>
    </>
  );
}

export default Page;
