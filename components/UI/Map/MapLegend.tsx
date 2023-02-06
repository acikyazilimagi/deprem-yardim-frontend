import { useState } from "react";
import styles from "./Map.module.css";
import { Tags } from "../Tag/Tag.types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";

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
          <div className={styles.legend_item} key={index}>
            <div
              className={styles.legend_item__color}
              style={{ backgroundColor: Tags[intensity].color }}
            ></div>
            <div className={styles.legend_item__text}>
              {Tags[intensity].intensity}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MapLegend;
