import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { urlId } = router.query;

  useEffect(() => {
    router.push(`/api/redirect/${urlId}`);
  }, [urlId, router]);

  return <p></p>;
}
