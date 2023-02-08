export type Tag = {
  id: number;
  intensity: string;
  color: string;
  minClus?: number;
  maxClus?: number;
};

export interface TTags {
  [key: string]: Tag;
}

export const Tags: TTags = {
  safe: {
    id: 1,
    intensity: "Az Yoğun",
    minClus: 0,
    maxClus: 0,
    color: "#ffff00",
  },
  low: {
    id: 2,
    intensity: "Az-Orta Yoğun",
    minClus: 1,
    maxClus: 3,
    color: "#ffd700",
  },
  "mid-low": {
    id: 3,
    intensity: "Orta Yoğun",
    minClus: 3,
    maxClus: 5,
    color: "#ffaf00",
  },
  mid: {
    id: 4,
    intensity: "Orta - Yüksek Yoğun",
    minClus: 5,
    maxClus: 26,
    color: "#ff8700",
  },
  "mid-high": {
    id: 5,
    intensity: "Yüksek Yoğun",
    minClus: 26,
    maxClus: 100,
    color: "#ff5f00",
  },
  high: {
    id: 6,
    intensity: "Çok Yoğun",
    minClus: 101,
    color: "#eb2f2f",
  },
};

export function findTagByClusterCount(clusterCount: number): Tag {
  const tag = Object.values(Tags).find(
    (tag) =>
      clusterCount >= (tag.minClus ?? 0) &&
      clusterCount <= (tag.maxClus ?? Number.MAX_SAFE_INTEGER)
  );

  return tag || Tags.safe;
}
