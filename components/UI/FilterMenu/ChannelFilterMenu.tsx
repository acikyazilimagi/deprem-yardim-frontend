import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useURLActions } from "@/stores/urlStore";
import { useEffect } from "react";
import CommonFilterMenu, { FilterMenuOption } from "./CommonFilterMenu";

type ChannelValueType = string | null;

const channelFilterMenuOptions: FilterMenuOption<ChannelValueType>[] = [
  { label: "all", value: null },
  { label: "twitter", value: "twitter" },
  { label: "babala", value: "babala" },
];

const lastFilterIdx = channelFilterMenuOptions.length - 1;
const initialChannelFilter = channelFilterMenuOptions[lastFilterIdx];

export const ChannelFilterMenu: React.FC = () => {
  const [filter, setFilter] = useLocalStorage<
    FilterMenuOption<ChannelValueType>
  >("filter_channel", initialChannelFilter);
  const { setChannelFilterMenuOption } = useURLActions();

  useEffect(() => {
    if (filter !== initialChannelFilter) {
      setChannelFilterMenuOption(filter.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <CommonFilterMenu<ChannelValueType>
      initialValue={filter.value}
      menuOptions={channelFilterMenuOptions}
      onChange={(_option: ChannelValueType) => {
        const filtered = channelFilterMenuOptions.find(
          (f) => f.value === _option
        );
        if (filtered) {
          setFilter(filtered);
        }
      }}
      translationPath="filter.channels"
    />
  );
};
