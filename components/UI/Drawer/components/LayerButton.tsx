import { Typography } from "@mui/material";
import Image from "next/image";

type LayerButtonProps = {
  onClick: () => void;
  image: string;
  title: string;
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
        style={{
          border: "2px solid",
          borderColor: checked ? "teal" : "transparent",
          display: "inline-flex",
          height: "66px",
          width: "66px",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
        }}
      >
        <Image alt={title} width="56" height="56" src={`images/${image}.png`} />
      </div>
      <Typography
        sx={{ color: checked ? "teal" : undefined, fontSize: "12px" }}
      >
        {title}
      </Typography>
    </button>
  );
};
