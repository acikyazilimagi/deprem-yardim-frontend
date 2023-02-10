import styles from "@/styles/Home.module.css";
import { Box } from "@mui/system";
import FilterReasoningMenu, {
  FilterReasoningMenuProps,
} from "./FilterReasoningMenu";
import FilterTimeMenu, { FilterTimeMenuProps } from "./FilterTimeMenu";
import { useTranslation } from "next-i18next";

type FilterMenuProps = {
  children: React.ReactNode;
};

type FilterMenuType = React.FC<FilterMenuProps> & {
  Time: React.FC<FilterTimeMenuProps>;
  Reasoning: React.FC<FilterReasoningMenuProps>;
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

export default FilterMenu;
