import { Typography } from "@mui/material";
import { DefaultTFuncReturn } from "i18next";
import styles from "./LayerButton.module.css";

type LayerButtonProps = {
  onClick: () => void;
  image: string;
  title?: string | DefaultTFuncReturn;
  checked: boolean;
};

export const LayerButton = ({
  onClick,
  image,
  title,
  checked,
}: LayerButtonProps) => {
  return (
    <button
      onClick={onClick}
      defaultChecked={checked}
      style={{
        flex: 1,
        border: "none",
        background: "transparent",
        display: "block",
        maxWidth: "33%",
      }}
    >
      <div
        className={styles.buttonImage}
        style={{
          borderColor: checked ? "teal" : "transparent",
          backgroundImage: `url(/images/${image}.png)`,
        }}
      />
      {!!title && (
        <Typography
          sx={{ color: checked ? "teal" : undefined, fontSize: "12px" }}
        >
          {title}
        </Typography>
      )}
    </button>
  );
};
