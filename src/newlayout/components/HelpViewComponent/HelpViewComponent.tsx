import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CloseIcon from "@mui/icons-material/Close";
interface HelpViewStore {
  isOpen: boolean;
  // for void return functions, input values will not be use in interface
  // eslint-disable-next-line no-unused-vars
  toggle: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export const useHelpView = create<HelpViewStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      toggle: (event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
        set(() => ({ isOpen: checked }), undefined, { type: "set" }),
    }),
    { name: "HelpViewStore" }
  )
);

export const HelpViewComponent = () => {
  const helpView = useHelpView();
  return (
    <Fade in={helpView.isOpen}>
      <Box>
        <Card sx={{ maxWidth: 550 }}>
          <CardHeader
            action={
              <IconButton aria-label="close">
                <CloseIcon />
              </IconButton>
            }
            title="Kullanım Kılavuzu"
          />
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be*nev*o*lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </Fade>
  );
};
