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
    intensity: "Güvenli Alanlar",
    minClus: 0,
    maxClus: 0,
    color: "#63ff00",
  },
  low: {
    id: 2,
    intensity: "Düşük Yoğunluk",
    minClus: 1,
    maxClus: 3,
    color: "#d6ff00",
  },
  "mid-low": {
    id: 3,
    intensity: "Orta - Alt Yoğunluk",
    minClus: 3,
    maxClus: 5,
    color: "#ffff00",
  },
  mid: {
    id: 4,
    intensity: "Orta  Yoğunluk",
    minClus: 5,
    maxClus: 26,
    color: "#ffc100",
  },
  "mid-high": {
    id: 5,
    intensity: "Orta - Üst Yoğunluk",
    minClus: 26,
    maxClus: 100,
    color: "#F0944B",
  },
  high: {
    id: 6,
    intensity: "Yoğun",
    minClus: 101,
    color: "#ff0000",
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
