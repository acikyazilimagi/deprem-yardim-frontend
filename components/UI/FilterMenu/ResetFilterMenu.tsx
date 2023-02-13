import CommonFilterMenu, { FilterMenuOption } from "./CommonFilterMenu";

type ResetValueType = string | null;

const resetFilterMenuOptions: FilterMenuOption<ResetValueType>[] = [
  { label: "title", value: null },
  { label: "all", value: "Tümü" },
  { label: "channel", value: "Kanal" },
  { label: "reason", value: "Türler" },
  { label: "time", value: "Zaman" },
];

const [initialResetFilter] = resetFilterMenuOptions;

export const ResetFilterMenu: React.FC = () => {
  return (
    <>
      <CommonFilterMenu<ResetValueType>
        initialValue={initialResetFilter.value}
        menuOptions={resetFilterMenuOptions}
        //There should be onChange listener
        onChange={() => {}}
        translationPath="filter.resets"
      />
    </>
  );
};
