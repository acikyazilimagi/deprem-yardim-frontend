import styles from "@/styles/Home.module.css";
import { Box } from "@mui/system";
import LocaleSwitch, { LocaleSwitchProps } from "../I18n/LocaleSwitch";
import FilterReasoningMenu, {
  FilterReasoningMenuProps,
} from "./FilterReasoningMenu";
import FilterTimeMenu, { FilterTimeMenuProps } from "./FilterTimeMenu";

type FilterMenuProps = {
  children: React.ReactNode;
};

type FilterMenuType = React.FC<FilterMenuProps> & {
  Time: React.FC<FilterTimeMenuProps>;
  Reasoning: React.FC<FilterReasoningMenuProps>;
  LocaleSwitch: React.FC<LocaleSwitchProps>;
};

const FilterMenu: FilterMenuType = ({ children }) => {
  return (
    <Box>
      <div className={styles.filterMenu}>
        <span>Ayarlar</span>
        {children}
      </div>
    </Box>
  );
};
FilterMenu.Time = FilterTimeMenu;
FilterMenu.Reasoning = FilterReasoningMenu;
FilterMenu.LocaleSwitch = LocaleSwitch;

export default FilterMenu;
