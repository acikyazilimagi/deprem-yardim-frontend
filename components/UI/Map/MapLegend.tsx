import { useState } from "react";
import styles from "./Map.module.css";
import { Tags } from "../Tag/Tag.types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Popover, Typography } from "@mui/material";
import { MouseEvent } from "react";

const MapLegend = () => {
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  let legendToggleStatusClass = styles.legend;

  if (isLegendOpen) {
    legendToggleStatusClass += ` ${styles.open}`;
  }

  return (
    <>
      <div className={legendToggleStatusClass}>
        {isLegendOpen ? (
          <CloseIcon
            color="action"
            onClick={() => setIsLegendOpen((previous) => !previous)}
          />
        ) : (
          <ArrowBackIosIcon
            color="action"
            onClick={() => setIsLegendOpen((previous) => !previous)}
          />
        )}
        {Object.keys(Tags).map((intensity) => (
          <div key={intensity}>
            <PopOver
              title={Tags[intensity].intensity}
              color={Tags[intensity].color}
            />
          </div>
        ))}
      </div>
    </>
  );
};

interface PopOverProps {
  title: string;

  color: string;
}

const PopOver = ({ title, color }: PopOverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = anchorEl ? "simple-popover" : undefined;

  return (
    <>
      <Button
        className={styles.legend_item}
        aria-label={title}
        onClick={handleClick}
      >
        <div
          className={styles.legend_item__color}
          style={{ backgroundColor: color }}
        />
        <span className={styles.legend_item__text}>{title}</span>
      </Button>
      <Popover
        id={id}
        open={!!anchorEl}
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
};

export default MapLegend;
