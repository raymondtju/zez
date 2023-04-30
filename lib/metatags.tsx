// import urlMeta from "url-metadata";
import urlMeta from "open-graph-scraper"

export const getMetatags = async (url: string) => {
  try {
    const get = await urlMeta({url});
    console.log(get.result);
    // const title = get["title"] || get["og:title"] || get["twitter:title"];
    // const image = get["image"] || get["og:image"];
    // const description =
    //   get["description"] || get["og:description"] || get["twitter:description"];

    return {
      title: get.result.ogTitle || "",
      description: get.result.ogDescription || "",
      image: get.result?.ogImage?.url || "",
    };
  } catch (err) {
    return null;
  }
};
