export function formatDate(date) {
  const d = new Date(date);
  const dtf = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour: "numeric",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  });
  const [
    { value: mo },
    ,
    { value: da },
    ,
    { value: ye },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: timeZone },
    ,
    { value: timeZoneName },
  ] = dtf.formatToParts(d);

  return `${da} ${mo} ${ye} ${hour}:${minute} ${timeZone}, ${timeZoneName}`;
}
