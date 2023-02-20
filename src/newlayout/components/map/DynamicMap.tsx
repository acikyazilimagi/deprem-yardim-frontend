import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { memo, ReactNode, useEffect } from "react";
import { css, Global } from "@emotion/react";
import * as ReactLeaflet from "react-leaflet";
import { Tags } from "@/components/UI/Tag/Tag.types";

const GlobalClusterStyle = css`
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

interface MapProps {
  className?: string;
  children: ReactNode;
}

const updateLeafletIcons = () => {
  // @ts-ignore
  delete Leaflet.Icon.Default.prototype._getIconUrl;
  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: "/leaflet/images/marker-icon-2x.webp",
    iconUrl: "/leaflet/images/marker-icon.webp",
    shadowUrl: "/leaflet/images/marker-shadow.webp",
  });
};

const Map = ({ children, className, ...rest }: MapProps) => {
  useEffect(() => {
    updateLeafletIcons();
  }, []);

  return (
    <ReactLeaflet.MapContainer
      className={className}
      {...rest}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Global styles={GlobalClusterStyle} />
      {children}
    </ReactLeaflet.MapContainer>
  );
};

export default memo(Map);
