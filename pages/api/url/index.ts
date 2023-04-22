import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/auth";
import { redis } from "@/lib/upstash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query
  if (req.method === "GET") {
    if (type == "public") {
      try {
        const scan = await redis.scan(0)
        let data = scan[1]
        data = data.filter((element) => {
          if (!element.includes((process.env.NEXT_PUBLIC_BASE_URL).split("://")[1])) {
            return false; 
          }
          return true;
        })
        
        for (const x in data) {
          const pipeline2 = redis.multi();
          pipeline2.ttl(data[x]);
          pipeline2.get(data[x]);
          const [exp, url] = await pipeline2.exec();

          if (exp === -1) {
            delete data[x];
            continue
          }
          
          data[x] = {   
            key: data[x].split(":")[3],
            val: url.url,
            exp
          }
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
