import { css, Global } from "@emotion/react";
import { Tags } from "../Tag/Tag.types";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

const styles = css`
  ${Object.values(Tags).map(
    (tag) => `
    .leaflet-custom-cluster-${tag.id} {
      .cluster-inner {
        background-color: ${tag.color}DE;
        border: ${tag.color} 2px solid;
        color: #212121;
        width: 36px;
        height: 36px;
        opacity: 0.9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
      }
    }
  `
  )}
`;

export const MapClusterStyle = () => {
  return <Global styles={styles} />;
};
