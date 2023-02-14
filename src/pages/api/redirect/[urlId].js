import { fetch } from "@/utils";

const redirect = async (req, res) => {
  const { urlId } = req.query;
  try {
    const check = await fetch(`${process.env.NEXT_PUBLIC_DEV_BE_API}/${urlId}`);
    // console.log(check);
    res.redirect(307, `${process.env.NEXT_PUBLIC_DEV_BE_API}/${urlId}`);
  } catch (error) {
    res.redirect(307, "/");
  }
  //   const check = await fetch(`${process.env.BE_API}/${urlId}`);
  //   console.log(check);
  //   if (check) {
  //     res.redirect(307, `${process.env.BE_API}/${urlId}`);
  //   } else {
  //     res.redirect(404, "/");
  //   }

  //   try {
  //     const check = await fetch(`${process.env.BE_API}/${urlId}`);
  //     console.log(check);
  //     // await res.redirect(307, `${process.env.BE_API}/${urlId}`);
  //   } catch (error) {
  //     res.redirect(404, "/");
  //   }
};

export default redirect;
