import styles from "@/styles/Home.module.css";
import { Box } from "@mui/system";
import LocaleSwitch, { LocaleSwitchProps } from "../I18n/LocaleSwitch";
import TileLayerMenu, { TileLayerMenuProps } from "./TileLayer";
import FilterReasoningMenu, {
  FilterReasoningMenuProps,
} from "./FilterReasoningMenu";
import FilterTimeMenu, { FilterTimeMenuProps } from "./FilterTimeMenu";
import { useTranslation } from "react-i18next";

type FilterMenuProps = {
  children: React.ReactNode;
};

type FilterMenuType = React.FC<FilterMenuProps> & {
  Time: React.FC<FilterTimeMenuProps>;
  Reasoning: React.FC<FilterReasoningMenuProps>;
  LocaleSwitch: React.FC<LocaleSwitchProps>;
  TileLayer: React.FC<TileLayerMenuProps>;
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
FilterMenu.Reasoning = FilterReasoningMenu;
FilterMenu.LocaleSwitch = LocaleSwitch;
FilterMenu.TileLayer = TileLayerMenu;

export default FilterMenu;
