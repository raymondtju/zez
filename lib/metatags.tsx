import urlMeta from "url-metadata";

export const getMetatags = async (url: string) => {
  try {
    const get = await urlMeta(url)
    const title = get["title"] || get["og:title"] || get["twitter:title"];
    const image = get["image"] || get["og:image"];
    const description =
      get["description"] || get["og:description"] || get["twitter:description"];
      
    return {
      title,
      description,
      image,
    };
  } catch (err) {
    return null;
  }
};