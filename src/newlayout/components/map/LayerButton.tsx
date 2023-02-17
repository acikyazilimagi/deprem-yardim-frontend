import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { DefaultTFuncReturn } from "i18next";

type LayerButtonProps = {
  onClick: () => void;
  image: string;
  title?: string | DefaultTFuncReturn;
  checked: boolean;
};
interface IStyles {
  [key: string]: SxProps<Theme>;
}
export const LayerButton = ({
  onClick,
  image,
  title,
  checked,
}: LayerButtonProps) => {
  console.log("LayerButton", { onClick, image, title, checked });
  return (
    <Stack>
      <Box sx={checked ? styles.containerChecked : styles.container}>
        <IconButton
          onClick={onClick}
          defaultChecked={checked}
          sx={styles.button}
        >
          <Stack>
            <Box
              component={"img"}
              width={"56px"}
              height={"56px"}
              src={`/images/${image}.png`}
              alt={`/images/${image}.png`}
              sx={styles.buttonImageChecked}
            />
          </Stack>
        </IconButton>
      </Box>
      {!!title && (
        <Typography sx={checked ? styles.labelChecked : styles.label}>
          {title}
        </Typography>
      )}
    </Stack>
  );
};

const styles: IStyles = {
  stack: () => ({
    maxWidth: "66px",
  }),
  label: (theme: Theme) => ({
    marginTop: 0.75,
    color: theme.palette.common.black,
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "center",
  }),
  labelChecked: (theme: Theme) => ({
    marginTop: 0.75,
    color: theme.palette.primary.main,
    fontSize: "14px",
    fontWeight: 400,
    textAlign: "center",
  }),
  button: () => ({
    flex: 1,
    border: "none",
    background: "transparent",
    display: "block",
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  }),
  container: () => ({
    border: "1px solid",
    padding: 0.5,
    backgroundColor: "white",
    borderRadius: "14px",
    borderColor: "transparent",
    maxWidth: "66px",
  }),
  containerChecked: (theme: Theme) => ({
    border: "1.5px solid",
    padding: 0.5,
    backgroundColor: "white",
    borderRadius: "14px",
    borderColor: theme.palette.primary.main,
    maxWidth: "66px",
  }),
  buttonImageChecked: () => ({
    display: "inline-flex",
    height: "56px",
    width: "56px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    backgroundSize: "56px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  }),
};
