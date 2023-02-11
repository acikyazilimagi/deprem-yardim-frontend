import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import FilterMenuButton from "@/components/UI/FilterMenu/FilterMenuButton";

const languages = [
  {
    locale: "en",
    text: "EN",
  },
  {
    locale: "tr",
    text: "TR",
  },
];

export type LocaleSwitchProps = {
  current: string;

  // eslint-disable-next-line no-unused-vars
  onChange: (locale: string) => void;
  mobile?: boolean;
};

const LocaleSwitch: React.FC<LocaleSwitchProps> = ({
  current,
  onChange,
  mobile = false,
}) => {
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
        sx={{
          background: "white",
          color: "#344054",
          "&:hover": { background: "white" },
          border: "1px solid #BABBBE",
          borderRadius: "8px",
          height: mobile ? "32px" : "36px",
          fontSize: mobile ? "12px" : "14px",
        }}
      >
        <TranslateIcon
          sx={{
            fontSize: mobile ? "16px" : "20px",
          }}
        ></TranslateIcon>
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
