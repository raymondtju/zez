import * as cheerio from "cheerio";

export const getMetatags = async (url: string) => {
  const get = await fetch(url);
  const html = await get.text();

  const $ = cheerio.load(html);
  const title =
    $('meta[property="og:title"]').attr("content") ||
    $("title").text() ||
    $('meta[name="title"]').attr("content");
  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="description"]').attr("content");
  const image =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[property="og:image:url"]').attr("content");
  return {
    title,
    description,
    image
  }
};
