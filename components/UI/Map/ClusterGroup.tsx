import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import React, { Fragment, MouseEvent } from "react";
import MarkerClusterGroup from "./MarkerClusterGroup";
import { findTagByClusterCount } from "../Tag/Tag.types";
import L from "leaflet";
import { MarkerData } from "@/mocks/types";
import { Marker, MarkerProps } from "react-leaflet";

type Props = {
  data: MarkerData[];
};

type ExtendedMarkerProps = MarkerProps & {
  markerData: MarkerData;
};

function ExtendedMarker({ ...props }: ExtendedMarkerProps) {
  return <Marker {...props} />;
}

const ClusterGroup = ({ data }: Props) => {
  const { handleClusterClick, handleMarkerClick } = useMapClickHandlers();
  return (
    <MarkerClusterGroup
      // @ts-expect-error
      onClick={handleClusterClick}
      // @ts-expect-error
      iconCreateFunction={(cluster) => {
        const count = cluster.getChildCount();
        const tag = findTagByClusterCount(count);

        return L.divIcon({
          html: `<div class="cluster-inner"><span>${count}</span></div>`,
          className: `leaflet-marker-icon marker-cluster leaflet-interactive leaflet-custom-cluster-${tag.id}`,
        });
      }}
    >
      {data.map((marker: MarkerData) => (
        <Fragment key={marker.reference}>
          <ExtendedMarker
            key={marker.reference}
            position={[
              marker.geometry.location.lat,
              marker.geometry.location.lng,
            ]}
            eventHandlers={{
              click: (e) => {
                handleMarkerClick(e as any as MouseEvent, marker);
              },
            }}
            markerData={marker}
          />
        </Fragment>
      ))}
    </MarkerClusterGroup>
  );
};

export default ClusterGroup;
