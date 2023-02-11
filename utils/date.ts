export const getTimeAgo = (value: string) => {
  let result = "";
  const now = new Date().getTime();
  const valueZtoGMT3 = value.replace("Z", "+03:00");
  const valueTime = new Date(valueZtoGMT3).getTime();

  if (!valueTime) return null;

  const seconds = Math.floor((now - valueTime) / 1000);

  const years = Math.floor(seconds / 31536000);
  const months = Math.floor((seconds % 31536000) / 2628000);
  const days = Math.floor((seconds % 2628000) / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);

  const formatterYears = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterMonths = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterDays = new Intl.PluralRules("tr", { type: "ordinal" });
  const formatterHours = new Intl.PluralRules("tr", { type: "ordinal" });

  const yearCategory = formatterYears.select(years);
  const monthCategory = formatterMonths.select(months);
  const dayCategory = formatterDays.select(days);
  const hourCategory = formatterHours.select(hours);

  const labels: any = {
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
  };

  const yearsLabel = labels.years[yearCategory];
  const monthsLabel = labels.months[monthCategory];
  const daysLabel = labels.days[dayCategory];
  const hoursLabel = labels.hours[hourCategory];

  if (years) result += `${years} ${yearsLabel} `;
  if (months) result += `${months} ${monthsLabel} `;
  if (days) result += `${days} ${daysLabel} `;
  if (hours) result += `${hours} ${hoursLabel} `;
  result += " önce";
  return result;
};
