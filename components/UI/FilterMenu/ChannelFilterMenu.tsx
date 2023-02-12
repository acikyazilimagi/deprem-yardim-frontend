import { useURLActions } from "@/stores/urlStore";
import CommonFilterMenu, { FilterMenuOption } from "./CommonFilterMenu";

type ChannelValueType = string | null;

const channelFilterMenuOptions: FilterMenuOption<ChannelValueType>[] = [
  { label: "all", value: null },
  { label: "twitter", value: "twitter" },
  { label: "babala", value: "babala" },
];

const [initialChannelFilter] = channelFilterMenuOptions;

export const ChannelFilterMenu: React.FC = () => {
  const { setChannelFilterMenuOption } = useURLActions();
  return (
    <CommonFilterMenu<ChannelValueType>
      initialValue={initialChannelFilter.value}
      menuOptions={channelFilterMenuOptions}
      onChange={setChannelFilterMenuOption}
      translationPath="filter.channels"
    />
  );
};
