import { Reason } from "@/services/ApiClient";

const categories = [
  "afetzede",
  "barinma",
  "elektronik",
  "yiyecek",
  "saglik",
  "lojistik",
  "giyecek",
  "genel",
  "guvenlik",
] as const;

export type LocationCategory = (typeof categories)[number];

export interface LocationCategoryConfig {
  type: LocationCategory;
  reasons: Reason[];
}
