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
    color: "#0288D1",
  },
  low: {
    id: 2,
    intensity: "Düşük Yoğunluk",
    minClus: 1,
    maxClus: 3,
    color: "#CFCECD",
  },
  "mid-low": {
    id: 3,
    intensity: "Orta - Alt Yoğunluk",
    minClus: 3,
    maxClus: 5,
    color: "#FAF7BF",
  },
  mid: {
    id: 4,
    intensity: "Orta  Yoğunluk",
    minClus: 5,
    maxClus: 26,
    color: "#EE181B",
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
    color: "#74080A",
  },
};
