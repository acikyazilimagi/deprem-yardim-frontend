import { LocationCategory, LocationCategoryConfig } from "./types";

export const categoryFilters = {
  afetzede: {
    type: "afetzede",
    reasons: ["enkaz", "kurtarma"],
  },
  barinma: {
    type: "barinma",
    reasons: ["barinma", "konaklama"],
  },
  elektronik: {
    type: "elektronik",
    reasons: ["elektronik"],
  },
  yiyecek: {
    type: "yiyecek",
    reasons: ["erzak", "yemek", "su"],
  },
  saglik: {
    type: "saglik",
    reasons: ["saglik", "hayvanlar-icin-tedavi"],
  },
  lojistik: {
    type: "lojistik",
    reasons: ["lojistik"],
  },
  giyecek: {
    type: "giyecek",
    reasons: ["giysi"],
  },
  genel: {
    type: "genel",
    reasons: ["genel", "yardim"],
  },
  guvenlik: {
    type: "guvenlik",
    reasons: ["guvenli-noktalar"],
  },
} satisfies Record<LocationCategory, LocationCategoryConfig>;
