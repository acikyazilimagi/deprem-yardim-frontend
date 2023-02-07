import { useState } from "react";
import styles from "./Map.module.css";
import { Tags } from "../Tag/Tag.types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import { Button, ClickAwayListener, Popper, Typography } from "@mui/material";
import { MouseEvent } from "react";

const MapLegend = () => {
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<{
    el: HTMLButtonElement;
    id: string;
  } | null>(null);

  let legendToggleStatusClass = styles.legend;

  const id = anchorEl ? "simple-popover" : undefined;

  if (isLegendOpen) {
    legendToggleStatusClass += ` ${styles.open}`;
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    if (anchorEl && anchorEl.el === event.currentTarget)
      return setAnchorEl(null);
    setAnchorEl({ el: event.currentTarget, id });
  };

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
            <Button
              className={styles.legend_item}
              aria-describedby={id}
              onClick={(event) => handleClick(event, intensity)}
            >
              <div
                className={styles.legend_item__color}
                style={{ backgroundColor: Tags[intensity].color }}
              />
              <span className={styles.legend_item__text}>
                {Tags[intensity].intensity}
              </span>
            </Button>
            <Popper
              id={id}
              open={anchorEl?.id === intensity && !isLegendOpen}
              anchorEl={anchorEl?.el}
              sx={{ backgroundColor: "white", zIndex: 999, borderRadius: 2 }}
            >
              <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <Typography sx={{ p: 2 }}>
                  {Tags[intensity].intensity}
                </Typography>
              </ClickAwayListener>
            </Popper>
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
