import { useURLActions } from "@/stores/urlStore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useTranslation } from "next-i18next";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { addParameterToUrl, getParameterValueFromUrl } from "@/utils/helpers";

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
  const [filterValues, setValues] = React.useState<string[]>(
    reasonFilterMenuOptions
  );
  const parameterName = "reasons";

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    const selectedReasons =
      typeof value === "string" ? value.split(",") : value;

    setValues(selectedReasons);
    addParameterToUrl(parameterName, value);
  };

  React.useEffect(() => {
    const value = getParameterValueFromUrl(parameterName);
    if (value) {
      setValues(value.split(","));
    }
  }, []);

  React.useEffect(() => {
    setReasoningFilterMenuOption(filterValues.join(","));
  }, [filterValues, setReasoningFilterMenuOption]);

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
            padding: "4px",
          }}
          key={i}
          value={item}
        >
          <Checkbox
            size="small"
            sx={{
              padding: "0",
              margin: "0",
            }}
            checked={filterValues.indexOf(item) > -1}
          />

          <ListItemText
            disableTypography
            sx={{
              padding: "0",
              margin: "0 4px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "14px",
              whiteSpace: "nowrap",
            }}
            primary={t(`filter.reasons.${item}`).toLocaleUpperCase()}
          />
        </MenuItem>
      ))}
    </Select>
  );
};
