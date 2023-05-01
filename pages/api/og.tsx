import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

// Make sure the font exists in the specified path:
const font = fetch(
  new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/fonts/TYPEWR__.ttf`, import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const fontData = await font;
  const { searchParams } = new URL(req.url);
  const title = searchParams.has("title")
    ? searchParams.get("title")?.slice(0, 100)
    : "title";
  const description = searchParams.has("description")
    ? searchParams.get("description")?.slice(0, 100)
    : "dec";

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Typewriter",
          backgroundColor: "whitesmoke",
        }}
        tw="h-full w-full flex items-start justify-start"
      >
        <h1></h1>
        <div tw="flex flex-col w-full h-full justify-between p-20">
          <h1 tw="font-black text-[36px] italic">zez.pw</h1>
          <div tw="flex flex-col">
            <h3 tw="text-[60px] leading-tight font-black text-left">
              {title}
            </h3>
            <p tw="text-[36px] leading-tight font-semibold text-left">
              {description}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Typewriter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
