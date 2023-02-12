import { useURLActions } from "@/stores/urlStore";
import CommonFilterMenu, { FilterMenuOption } from "./CommonFilterMenu";

type ReasonValueType = string | null;

const reasonFilterMenuOptions: FilterMenuOption<ReasonValueType>[] = [
  { label: "all", value: null },
  { label: "shelter", value: "barinma" },
  { label: "electronics", value: "elektronik" },
  { label: "wreckage", value: "enkaz" },
  { label: "provisions", value: "erzak" },
  { label: "clothes", value: "giysi" },
  { label: "safe-points", value: "guvenli-noktalar" },
  { label: "animal-theraphy", value: "hayvanlar-icin-tedavi" },
  { label: "accomodation", value: "konaklama" },
  { label: "rescue", value: "kurtarma" },
  { label: "logistics", value: "lojistik" },
  { label: "water", value: "su" },
  { label: "looting", value: "yagma" },
  { label: "food", value: "yemek" },
  { label: "health", value: "hastahane_locations" },
];

const [initialReasonFilter] = reasonFilterMenuOptions;

export const ReasonFilterMenu: React.FC = () => {
  const { setReasoningFilterMenuOption } = useURLActions();
  return (
    <CommonFilterMenu<ReasonValueType>
      initialValue={initialReasonFilter.value}
      menuOptions={reasonFilterMenuOptions}
      onChange={setReasoningFilterMenuOption}
      translationPath="filter.reasons"
    />
  );
};
