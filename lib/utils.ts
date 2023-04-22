import moment from "moment";

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const formatSeconds = (sec: number) => {
    const hour = Math.floor(moment.duration(sec, "seconds").hours());
    const min = Math.floor(moment.duration(sec, "seconds").minutes())
    return {
      hour, min
    }
  }
