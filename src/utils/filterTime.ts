export type TimeOption =
  | "last30Minutes"
  | "last1Hour"
  | "last3Hours"
  | "last6Hours"
  | "last12Hours"
  | "last24Hours"
  | "last3Days"
  | "all";

export type FilterOption = {
  label: string;
  inMilliseconds: number;
  value: TimeOption;
};

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;

export const FilterOptions: readonly FilterOption[] = [
  {
    label: "lastHalfHour",
    inMilliseconds: (1 * HOUR_IN_MILLISECONDS) / 2,
    value: "last30Minutes",
  },
  {
    label: "lastHour",
    inMilliseconds: 1 * HOUR_IN_MILLISECONDS,
    value: "last1Hour",
  },
  {
    label: "lastThreeHours",
    inMilliseconds: 3 * HOUR_IN_MILLISECONDS,
    value: "last3Hours",
  },
  {
    label: "lastSixHours",
    inMilliseconds: 6 * HOUR_IN_MILLISECONDS,
    value: "last6Hours",
  },
  {
    label: "lastTwelveHours",
    inMilliseconds: 12 * HOUR_IN_MILLISECONDS,
    value: "last12Hours",
  },
  {
    label: "lastDay",
    inMilliseconds: 24 * HOUR_IN_MILLISECONDS,
    value: "last24Hours",
  },
  {
    label: "lastThreeDays",
    inMilliseconds: 3 * DAY_IN_MILLISECONDS,
    value: "last3Days",
  },
  { label: "all", inMilliseconds: -1, value: "all" },
] as const;

export const valueToOption = (value: string): FilterOption | undefined => {
  return FilterOptions.find((option) => option.value === value);
};

export const computeTimestamp = (option: FilterOption): number => {
  const currentTimestampInMillis = Date.now().valueOf();
  const pastTimestampInMillis =
    currentTimestampInMillis - option.inMilliseconds;
  const pastTimestampInSeconds = Math.floor(pastTimestampInMillis / 1000);
  return Math.floor(pastTimestampInSeconds);
};
