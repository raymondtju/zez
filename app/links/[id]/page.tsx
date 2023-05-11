import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prismadb";

import LinksContainer from "@/components/pages/links/links-container";
import { Metadata } from "next";

async function getLink({ params }) {
  const session = await getCurrentUser();
  const findLink = await prisma.url.findFirst({
    where: {
      urlId: params.id,
      userId: session?.id,
    },
  });
  if (!findLink) return null;
  return findLink;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getLink({ params });
  return { title: data?.title, description: data?.description };
}

async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const data = await getLink({ params });
  return (
    <>
      <LinksContainer data={data} />
    </>
  );
}

export default Page;
