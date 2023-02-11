import styles from "@/styles/Home.module.css";
import { Box } from "@mui/system";
import LocaleSwitch, { LocaleSwitchProps } from "../I18n/LocaleSwitch";
import FilterChannelMenu, { FilterChannelMenuProps } from "./FilterChannelMenu";
import ReasonFilterMenu, { FilterReasonMenuProps } from "./FilterReasonMenu";
import FilterTimeMenu, { FilterTimeMenuProps } from "./FilterTimeMenu";
import { useTranslation } from "next-i18next";

type FilterMenuProps = {
  children: React.ReactNode;
};

type FilterMenuType = React.FC<FilterMenuProps> & {
  Time: React.FC<FilterTimeMenuProps>;
  Channel: React.FC<FilterChannelMenuProps>;
  Reason: React.FC<FilterReasonMenuProps>;
  LocaleSwitch: React.FC<LocaleSwitchProps>;
};

const FilterMenu: FilterMenuType = ({ children }) => {
  const { t } = useTranslation("home");
  return (
    <Box>
      <div className={styles.filterMenu}>
        <span>{t("filter.title")}</span>
        {children}
      </div>
    </Box>
  );
};
FilterMenu.Time = FilterTimeMenu;
FilterMenu.Channel = FilterChannelMenu;
FilterMenu.LocaleSwitch = LocaleSwitch;
FilterMenu.Reason = ReasonFilterMenu;

export default FilterMenu;
