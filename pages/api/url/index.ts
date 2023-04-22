import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";
import { redis } from "@/lib/upstash";
import { PublicLinksProps } from "@/pages/public/links";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query
  if (req.method === "GET") {
    if (type == "public") {
      try {
        const scan = await redis.scan(0, {
          count: 50
        })
        let get = scan[1];
        let data: PublicLinksProps[] = get.map((item) => ({
          key: item,
          url: "",
          exp: null
        }))
        data = data.filter((element) => {
          if (!element.key.includes((process.env.NEXT_PUBLIC_BASE_URL).split("://")[1])) {
            return false; 
          }
          return true;
        })
        
        for (const x in data) {
          const pipeline2 = redis.multi();
          pipeline2.ttl(data[x].key);
          pipeline2.get(data[x].key);
          const [exp, url]: [number, { url: string }] = await pipeline2.exec();
          if (exp === -1) {
            delete data[x];
            continue
          }
          
          data[x] = {
            key: data[x].key.split(":")[3],
            val: url.url,
            exp
          } as PublicLinksProps
        }
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).send(error);
      }

    } else {
      try {
        const session = await getCurrentUser(req, res);
        if (!session) {
          return res.status(401).send("Unauthorized");
        }

        const get = await prisma.url.findMany({
          where: {
            userId: session.id,
          },
        });
        return res.status(200).json(get);
      } catch (error) {
        return res.status(400).send(error);
      }
    }
  } else return res.status(405).send("Method not allowed");
}
