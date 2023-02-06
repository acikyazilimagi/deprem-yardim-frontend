export type Tag = {
  id: number;
  intensity: string;
  color: string;
};

export interface TTags {
  [key: string]: Tag;
}

export const Tags: TTags = {
  safe: {
    id: 1,
    intensity: "Güvenli Alanlar",
    color: "#0288D1",
  },
  low: {
    id: 2,
    intensity: "Düşük Yoğunluk",
    color: "#CFCECD",
  },
  "mid-low": {
    id: 3,
    intensity: "Orta - Alt Yoğunluk",
    color: "#FAF7BF",
  },
  mid: {
    id: 4,
    intensity: "Orta  Yoğunluk",
    color: "#EE181B",
  },
  "mid-high": {
    id: 5,
    intensity: "Orta - Üst Yoğunluk",
    color: "#F0944B",
  },
  high: {
    id: 6,
    intensity: "Yoğun",
    color: "#74080A",
  },
};
