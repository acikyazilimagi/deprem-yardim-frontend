export const getTimeAgo = (value: string): string | null => {
  const now = new Date().getTime();
  const valueZtoGMT3 = value.replace("Z", "+03:00");
  const valueTime = new Date(valueZtoGMT3).getTime();

  if (!valueTime) return null;

  const seconds = Math.floor((now - valueTime) / 1000);
  let interval = seconds / 31536000;
  const rtf = new Intl.RelativeTimeFormat("tr", { numeric: "auto" });
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "year");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "month");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "day");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "hour");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), "minute");
  }
  return rtf.format(-Math.floor(interval), "second");
};
