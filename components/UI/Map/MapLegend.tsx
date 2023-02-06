import React from "react";
import styles from "./Map.module.css";

const LEGEND_TYPES = [
  {
    text: "güvenli alanlar",
    color: "#0288D1",
  },
  {
    text: "düşük yoğunluk",
    color: "#CFCECD",
  },
  {
    text: "orta-alt yoğunluk",
    color: "#FAF7BF",
  },
  {
    text: "orta yoğunluk",
    color: "#EE181B",
  },
  {
    text: "orta-üst yoğunluk",
    color: "#F0944B",
  },
  {
    text: "yoğun",
    color: "#74080A",
  },
];

function MapLegend() {
  return (
    <>
      <div className={styles.legend}>
        {LEGEND_TYPES.map((item, index) => (
          <div className={styles.legend_item} key={index}>
            <div
              className={styles.legend_item__color}
              style={{ backgroundColor: item.color }}
            ></div>
            <div className={styles.legend_item__text}>{item.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MapLegend;
