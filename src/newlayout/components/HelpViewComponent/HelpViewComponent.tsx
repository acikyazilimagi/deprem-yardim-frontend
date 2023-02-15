//#region imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Fade,
  IconButton,
  List,
  Stack,
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
  toggle: (_checked: boolean) => void;
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

  if (!helpView.isOpen) return null;
  return (
    <Fade in={helpView.isOpen}>
      <Box>
        <Card sx={{ maxWidth: 550 }}>
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
            {selectedLocale.blocks.map((block) => {
              switch (block.type) {
                case "header":
                  return (
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="primary.500"
                      gutterBottom
                    >
                      {block.data.text}
                    </Typography>
                  );
                case "list":
                  return (
                    <List>
                      {block.data.items?.map((item, index) => (
                        <Box component="ul" key={`help-view-list-${index}`}>
                          <Typography component="li" variant="body2">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </List>
                  );
                case "table":
                  return (
                    <Stack direction="row" spacing={1} sx={{ marginTop: 3 }}>
                      {block.data.content?.map((item, index) => {
                        const firstOrLast =
                          index === 0 ||
                          index === (block.data.content?.length as number) - 1;
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
                      sx={{ fontSize: 14 }}
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
    </Fade>
  );
};
//#endregion
