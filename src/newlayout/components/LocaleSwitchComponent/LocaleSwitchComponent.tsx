//#region imports
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//#endregion
//#region interfaces
interface IStyles {
  [key: string]: SxProps<Theme>;
}
//#endregion
//#region component
export const LocaleSwitchComponent = () => {
  const router = useRouter();
  const { locales, locale: defaultLocale, pathname, asPath, query } = router;
  const [activeState, setActiveState] = useState(defaultLocale);

  const setCookie = (_locale: string) => {
    document.cookie = `NEXT_LOCALE=${_locale}; max-age=31536000; path=/`;
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCookie(event.target.value as string);
    setActiveState(event.target.value as string);
    router.push({ pathname, query }, asPath, { locale: event.target.value });
  };

  useEffect(() => {
    if (defaultLocale) {
      setActiveState(defaultLocale);
    }
    // do not add `reload` to the dependency array because it will cause an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultLocale]);

  return (
    <Box sx={styles.select}>
      <FormControl sx={styles.select}>
        <Select
          sx={styles.select}
          value={activeState}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {locales?.map((_locale, index) => (
            <MenuItem key={`locale-select-item-${index}`} value={_locale}>
              {_locale === "en" ? "English" : "Türkçe"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
//#endregion
//#region styles
const styles: IStyles = {
  select: (theme: Theme) => ({
    width: "100px",
    height: "49px",
    fontSize: "14px",
    fontWeight: "400",
    borderImageWidth: "0px",
    backgroundColor: theme.palette.common.white,
    color: `${theme.palette.grey[700]} !important`,
    borderRadius: "8px !important",
    [theme.breakpoints.down("sm")]: {
      width: "50px",
    },
  }),
};
//#endregion
