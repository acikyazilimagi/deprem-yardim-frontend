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
              aria-label={Tags[intensity].intensity}
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

export default MapLegend;
