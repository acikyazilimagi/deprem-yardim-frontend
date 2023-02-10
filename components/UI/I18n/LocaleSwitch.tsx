import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import FilterMenuButton from "@/components/UI/FilterMenu/FilterMenuButton";

const languages = [
  {
    locale: "en",
    text: "English",
  },
  {
    locale: "tr",
    text: "Türkçe",
  },
];

export type LocaleSwitchProps = {
  current: string;

  // eslint-disable-next-line no-unused-vars
  onChange: (locale: string) => void;
};

const LocaleSwitch: React.FC<LocaleSwitchProps> = ({ current, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <FilterMenuButton
        ariaControls="locale-menu"
        open={open}
        onClick={handleClick}
      >
        <TranslateIcon></TranslateIcon>
        &nbsp;&nbsp;
        {languages.find((language) => language.locale === current)?.text}
      </FilterMenuButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {languages.map((language) => (
          <MenuItem
            key={language.locale}
            onClick={() => onChange(language.locale)}
            data-value={language.locale}
            disableRipple
          >
            {language.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LocaleSwitch;
