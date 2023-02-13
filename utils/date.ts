const YEAR_IN_SEC = 31536000;
const MONTH_IN_SEC = 2628000;
const DAY_IN_SEC = 86400;
const HOUR_IN_SEC = 3600;
const MINUTES_IN_SEC = 60;

export const getTimeAgo = (value: string, locale: string = "tr") => {
  let result = "";
  const now = new Date().getTime();
  const valueZtoGMT3 = value.replace("Z", "+03:00");
  const valueTime = new Date(valueZtoGMT3).getTime();

  if (!valueTime) return null;

  const valueInSeconds = Math.floor((now - valueTime) / 1000);

  const years = Math.floor(valueInSeconds / YEAR_IN_SEC);
  const months = Math.floor((valueInSeconds % YEAR_IN_SEC) / MONTH_IN_SEC);
  const days = Math.floor((valueInSeconds % MONTH_IN_SEC) / DAY_IN_SEC);
  const hours = Math.floor((valueInSeconds % DAY_IN_SEC) / HOUR_IN_SEC);
  const minutes = Math.floor((valueInSeconds % HOUR_IN_SEC) / MINUTES_IN_SEC);

  const formatterYears = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterMonths = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterDays = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterHours = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterMinutes = new Intl.PluralRules("tr", { type: "ordinal" });

  const yearCategory = formatterYears.select(years);
  const monthCategory = formatterMonths.select(months);
  const dayCategory = formatterDays.select(days);
  const hourCategory = formatterHours.select(hours);
  const minutesCategory = formatterMinutes.select(minutes);

  const labels: any = {
    tr: {
      years: {
        one: "yıl",
        other: "yıl",
      },
      months: {
        one: "ay",
        other: "ay",
      },
      days: {
        one: "gün",
        other: "gün",
      },
      hours: {
        one: "saat",
        other: "saat",
      },
      minutes: {
        one: "dakika",
        other: "dakika",
      },
    },
    en: {
      years: {
        one: "year",
        other: "years",
      },
      months: {
        one: "month",
        other: "months",
      },
      days: {
        one: "day",
        other: "days",
      },
      hours: {
        one: "hour",
        other: "hours",
      },
      minutes: {
        one: "minute",
        other: "minutes",
      },
    },
  };

  const yearsLabel = labels[locale].years[yearCategory];
  const monthsLabel = labels[locale].months[monthCategory];
  const daysLabel = labels[locale].days[dayCategory];
  const hoursLabel = labels[locale].hours[hourCategory];
  const minutesLabel = labels[locale].minutes[minutesCategory];

  if (years) result += `${years} ${yearsLabel} `;
  if (months) result += `${months} ${monthsLabel} `;
  if (days) result += `${days} ${daysLabel} `;
  if (hours) result += `${hours} ${hoursLabel} `;
  if (minutes) result += `${minutes} ${minutesLabel} `;
  if (locale === "tr") result += " önce";
  else result += " ago";
  return result;
};
