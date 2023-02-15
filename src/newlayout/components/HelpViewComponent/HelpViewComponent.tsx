//#region imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Fade,
  IconButton,
  List,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { data } from "./data";
//#endregion
//#region interfaces
interface HelpViewStore {
  isOpen: boolean;
  // for void return functions, input values will not be use in interface
  // eslint-disable-next-line no-unused-vars
  toggle: (checked: boolean) => void;
}
//#endregion
//#region store
export const useHelpView = create<HelpViewStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      toggle: (checked: boolean) =>
        set(() => ({ isOpen: checked }), undefined, { type: "set" }),
    }),
    { name: "HelpViewStore" }
  )
);
//#endregion
//#region component
export const HelpViewComponent = () => {
  const { locale } = useRouter();
  const helpView = useHelpView();
  const [selectedLocale, setselectedLocale] = useState(data.tr);
  const chipColorSelector = (item: string) => {
    switch (item) {
      case "1":
        return "#FAF7BF";
      case "2":
        return "#FCD73F";
      case "3":
        return "#FDAE33";
      case "4":
        return "#FE8427";
      case "5":
        return "#FE591D";
      default:
        return "#EB2032";
    }
  };
  useEffect(() => {
    //TODO: Data interface required
    //@ts-ignore
    setselectedLocale(locale === "en" ? data.en : data.tr);
  }, [locale]);

  return (
    <Fade in={helpView.isOpen}>
      <Container sx={styles.container}>
        <Box>
          <Card sx={styles.card}>
            <CardHeader
              action={
                <IconButton
                  aria-label="close"
                  onClick={() => {
                    helpView.toggle(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              }
              title={selectedLocale.title.data.text}
            />
            <CardContent>
              {selectedLocale.blocks.map((block, index) => {
                switch (block.type) {
                  case "header":
                    return (
                      <Typography
                        key={`help-view-item-${index}`}
                        sx={styles.header}
                        color="primary.500"
                        gutterBottom
                      >
                        {block.data.text}
                      </Typography>
                    );
                  case "list":
                    return (
                      <List key={`help-view-item-${index}`}>
                        {block.data.items?.map((item, index) => (
                          <Box component="ul" key={`help-view-list-${index}`}>
                            <Typography
                              component="li"
                              variant="body1"
                              marginBottom={1}
                              sx={styles.header}
                            >
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </List>
                    );
                  case "table":
                    return (
                      <Stack
                        key={`help-view-item-${index}`}
                        display={"flex"}
                        direction="row"
                        flexWrap={"wrap"}
                        gap={1}
                        sx={styles.table}
                      >
                        {block.data.content?.map((item, index) => {
                          const firstOrLast =
                            index === 0 ||
                            index ===
                              (block.data.content?.length as number) - 1;
                          const shouldShowLabel = firstOrLast
                            ? item[0]
                            : undefined;
                          const chipColor = chipColorSelector(item[1]);
                          return (
                            <Chip
                              key={`help-view-chip-${index}`}
                              label={shouldShowLabel}
                              icon={
                                <CircleIcon
                                  sx={{
                                    fill: chipColor,
                                  }}
                                />
                              }
                            />
                          );
                        })}
                      </Stack>
                    );
                  default:
                    return (
                      <Typography
                        key={`help-view-item-${index}`}
                        sx={styles.header}
                        color="primary.500"
                        gutterBottom
                      >
                        {block.data.text}
                      </Typography>
                    );
                }
              })}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Fade>
  );
};
//#endregion
//#region styles
const styles = {
  container: (theme: Theme) => ({
    padding: "0 !important",

    [theme.breakpoints.up("xs")]: {
      backgroundColor: "primary.200",
    },
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "primary.300",
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: "primary.400",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: "primary.500",
    },
    [theme.breakpoints.up("xl")]: {
      backgroundColor: "primary.600",
    },
  }),
  card: (theme: Theme) => ({
    [theme.breakpoints.up("xs")]: {
      maxWidth: "100%",
      height: "100vh",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 550,
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 550,
      height: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 550,
      height: "auto",
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: 550,
      height: "auto",
    },
  }),
  header: () => ({ fontSize: 16 }),
  table: () => ({ marginTop: 3 }),
};
//#endregion
