import { useURLActions } from "@/stores/urlStore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useTranslation } from "next-i18next";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

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

export const ReasonFilterMenu: React.FC = () => {
  const { t } = useTranslation("home");

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
      renderValue={(selected) =>
        selected
          .map((val: any) => t(`filter.reasons.${val}`).toLocaleUpperCase())
          .join(", ")
      }
      value={filterValues}
      onChange={handleChange}
    >
      {reasonFilterMenuOptions.map((item, i) => (
        <MenuItem
          sx={{
            maxWidth: "170px",
            padding: "5px",
          }}
          key={i}
          value={item}
        >
          <Checkbox
            sx={{
              padding: "0",
              margin: "0",
            }}
            checked={filterValues.indexOf(item) > -1}
          />

          <ListItemText
            sx={{
              padding: "0",
              margin: "0 4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            primary={t(`filter.reasons.${item}`).toLocaleUpperCase()}
          />
        </MenuItem>
      ))}
    </Select>
  );
};
