import urlMeta from "open-graph-scraper"

export const getMetatags = async (url: string) => {
  try {
    const get = await urlMeta({url});
    console.log(get.result);
    const data = get.result;

    return {
      title: data.ogTitle || "",
      description: data.ogDescription || "",
      image: data?.ogImage["url"] || "",
    };
  } catch (err) {
    return null;
  }
};
