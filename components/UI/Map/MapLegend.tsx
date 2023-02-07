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
              isLegendOpen={isLegendOpen}
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
  isLegendOpen: boolean;
}

const PopOver = ({ title, color, isLegendOpen }: PopOverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    !isLegendOpen && setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = anchorEl ? "simple-popover" : undefined;

  return (
    <>
      <Button
        className={styles.legend_item}
        aria-describedby={id}
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
