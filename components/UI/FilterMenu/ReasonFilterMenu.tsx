import { useURLActions } from "@/stores/urlStore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useTranslation } from "next-i18next";
import { Theme, useTheme } from "@mui/material/styles";

const reasonFilterMenuOptions: string[] = [
  "barinma",
  "elektronik",
  "enkaz",
  "erzak",
  "guvenli-noktalar",
  "hayvanlar-icin-tedavi",
  "giysi",
  "konaklama",
  "kurtarma",
  "lojistik",
  "su",
  "yagma",
  "yemek",
];

function getStyles(value: string, values: string[], theme: Theme) {
  return {
    fontWeight:
      values.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    background: values.indexOf(value) === -1 ? "white" : "#bbc3d253",
    margin: "1px",
    fontSize: "0.8rem",
    maxWidth: "170px",
  };
}

export const ReasonFilterMenu: React.FC = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();

  const { setReasoningFilterMenuOption } = useURLActions();
  const [filterValues, setValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    setValues(reasonFilterMenuOptions);
  }, []);

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    const selectedReasons =
      typeof value === "string" ? value.split(",") : value;

    setValues(selectedReasons);
    setReasoningFilterMenuOption(selectedReasons);
  };

  return (
    <Select
      sx={{
        width: 170,
        background: "white",
        height: "48px",
        borderRadius: "8px",
      }}
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple
      value={filterValues}
      onChange={handleChange}
    >
      {reasonFilterMenuOptions.map((item, i) => (
        <MenuItem
          key={i}
          value={item}
          style={getStyles(item, filterValues, theme)}
        >
          {t(`filter.reasons.${item}`).toLocaleUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
};
