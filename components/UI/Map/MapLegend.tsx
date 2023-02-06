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

  return (
    <>
      <div
        className={`${styles.legend}${isLegendOpen ? " " + styles.open : ""}`}
      >
        {!isLegendOpen && (
          <ArrowBackIosIcon color="action" onClick={toggleLegend} />
        )}
        {isLegendOpen && <CloseIcon color="action" onClick={toggleLegend} />}
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
