import { DataCategory, DataCategoryValues } from "@/services/ApiClient";

export const categoryFilters: Record<DataCategory, DataCategoryValues> = {
  afetzede: {
    type: "afetzede",
    reasons: ["enkaz", "kurtarma"],
    channels: [],
  },
  barinma: {
    type: "barinma",
    reasons: ["barinma", "konaklama"],
    channels: [],
  },
  elektronik: {
    type: "elektronik",
    reasons: ["elektronik"],
    channels: [],
  },
  yiyecek: {
    type: "yiyecek",
    reasons: ["erzak", "yemek", "su"],
    channels: [],
  },
  saglik: {
    type: "saglik",
    reasons: ["saglik", "hayvanlar-icin-tedavi"],
    channels: [],
  },
  lojistik: {
    type: "lojistik",
    reasons: ["lojistik"],
    channels: [],
  },
  giyecek: {
    type: "giyecek",
    reasons: ["giysi"],
    channels: [],
  },
  genel: {
    type: "genel",
    reasons: ["genel", "yardim"],
    channels: [],
  },
  guvenlik: {
    type: "guvenlik",
    reasons: ["guvenli-noktalar"],
    channels: [],
  },
};
