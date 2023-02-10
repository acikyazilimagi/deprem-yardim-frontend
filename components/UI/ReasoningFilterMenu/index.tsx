import { useEffect, useState, MouseEvent } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "../../../styles/Home.module.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ReasoningFilterMenuOptionType = "reason" | "channel";

export const reasoningFilterMenuOptions: readonly ReasoningFilterMenuOption[] =
  [
    {
      label: "Depremzede",
      value: "twitter",
      type: "channel",
    },
    {
      label: "Erzak Yardımı",
      value: "erzak",
      type: "reason",
    },
    {
      label: "Teyitli",
      value: "enkaz",
      type: "reason",
    },
  ] as const;

export const initialReasoningFilter = reasoningFilterMenuOptions[0];

export interface ReasoningFilterMenuOption {
  label: string;

  value: string;

  type: ReasoningFilterMenuOptionType;
}

const valueToOption = (value: string): ReasoningFilterMenuOption => {
  return reasoningFilterMenuOptions.find(
    (option) => option.value === value
  ) as ReasoningFilterMenuOption;
};

interface ReasoningFilterMenuProps {
  onChange: (_option: ReasoningFilterMenuOption) => void;
}

const localFilterMenuSelectedKey = "initReasoningFilterMenuSelectedValue";
const ReasoningFilterMenu = ({ onChange }: ReasoningFilterMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedValue, setSelectedValue] = useLocalStorage(
    localFilterMenuSelectedKey,
    initialReasoningFilter.value
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as string;

    setSelectedValue(value);

    handleClose();
  };

  useEffect(() => {
    const option = valueToOption(selectedValue);

    onChange(option);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <Box>
      <div className={styles.filterMenu}>
        <span>Bildirimler</span>
        <Button
          aria-controls={open ? "CHANGEME-filtrele" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            background: "white",
            color: "#344054",
            "&:hover": { background: "white" },
            border: "1px solid #BABBBE",
            borderRadius: "8px",
            height: "48px",
          }}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          {
            reasoningFilterMenuOptions.find(
              (option) => option.value === selectedValue
            )?.label
          }
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {reasoningFilterMenuOptions.map((option) => (
            <MenuItem
              key={option.value}
              onClick={handleMenuItemClick}
              data-value={option.value}
              disableRipple
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
};

export default ReasoningFilterMenu;
