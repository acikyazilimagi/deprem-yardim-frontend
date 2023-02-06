import React from "react";
import styles from "./Map.module.css";
import { Tags } from "../Tag/Tag.types";

function MapLegend() {
  return (
    <>
      <div className={styles.legend}>
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
