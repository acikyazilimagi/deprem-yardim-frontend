import { useState } from "react";
import styles from "./Map.module.css";
import { Tags } from "../Tag/Tag.types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { Popover, Typography } from "@mui/material";

function MapLegend() {
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  function toggleLegend() {
    setIsLegendOpen(!isLegendOpen);
  }

  let legendToggleStatusClass = styles.legend;

  if (isLegendOpen) {
    legendToggleStatusClass += ` ${styles.open}`;
  }

  return (
    <>
      <div className={legendToggleStatusClass}>
        {isLegendOpen ? (
          <CloseIcon color="action" onClick={toggleLegend} />
        ) : (
          <ArrowBackIosIcon color="action" onClick={toggleLegend} />
        )}
        {Object.keys(Tags).map((intensity, index) => (
          <div key={index}>
            <PopOver
              title={Tags[intensity].intensity}
              color={Tags[intensity].color}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function PopOver({ title, color }: { title: string; color: string }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <button
        className={styles.legend_item}
        aria-describedby={id}
        onClick={handleClick}
      >
        <div
          className={styles.legend_item__color}
          style={{ backgroundColor: color }}
        ></div>
        <span className={styles.legend_item__text}>{title}</span>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{title}</Typography>
      </Popover>
    </>
  );
}

export default MapLegend;
