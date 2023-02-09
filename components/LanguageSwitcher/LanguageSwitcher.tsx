import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { locales, locale, route } = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        id="lang-button"
        color="secondary"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={styles.button}
      >
        {locale}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lang-button",
        }}
        PaperProps={{
          sx: {
            width: "63px",
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        {locales &&
          [...locales].map((locale) => (
            <MenuItem key={locale} value={locale} className={styles.listItem}>
              <Link href={route} locale={locale}>
                {locale.toUpperCase()}
              </Link>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};
export default LanguageSwitcher;
