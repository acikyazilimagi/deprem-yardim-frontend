// FIXME: REMOVE BELOW LINE LATER
// @ts-nocheck
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { MouseEvent } from "react";
import { findTagByClusterCount } from "../Tag/Tag.types";
import L from "leaflet";
import { MarkerData } from "@/mocks/types";
import { Marker, MarkerProps, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import styles from "./Map.module.css";

type Props = {
  data: MarkerData[];
};

type ExtendedMarkerProps = MarkerProps & {
  markerData: MarkerData;
};

function ExtendedMarker({ ...props }: ExtendedMarkerProps) {
  return <Marker {...props} />;
}

const fetchIcon = (count: number) => {
  const tag = findTagByClusterCount(count);

  return L.divIcon({
    html: `<div class="cluster-inner"><span>${count}</span></div>`,
    className: `leaflet-marker-icon marker-cluster leaflet-interactive leaflet-custom-cluster-${tag.id}`,
  });
};

const markerBlueIcon = L.Icon.Default.extend({
  options: {},
});

const markerGrayIcon = L.Icon.Default.extend({
  options: {
    className: styles.marker_icon__visited,
  },
});

const ClusterGroup = ({ data }: Props) => {
  const { handleClusterClick, handleMarkerClick } = useMapClickHandlers();
  const map = useMap();

  const geoJSONPlaces = data.map((marker) => ({
    type: "Feature",
    properties: {
      cluster: false,
      marker,
    },
    geometry: {
      type: "Point",
      coordinates: [marker.geometry.location.lng, marker.geometry.location.lat],
    },
  }));

  const bounds = map.getBounds();

  const { clusters, supercluster } = useSupercluster({
    points: geoJSONPlaces,
    bounds: [
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat,
    ],
    zoom: map.getZoom(),
    options: { radius: 150, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(pointCount)}
              eventHandlers={{
                click: () => {
                  handleClusterClick(data, pointCount);
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    18
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        return (
          <ExtendedMarker
            key={cluster.properties.marker.reference}
            position={[latitude, longitude]}
            icon={
              cluster.properties.marker.isVisited === true
                ? new markerGrayIcon()
                : new markerBlueIcon()
            }
            eventHandlers={{
              click: (e) => {
                handleMarkerClick(
                  e as any as MouseEvent,
                  cluster.properties.marker,
                  data
                );
              },
            }}
            markerData={cluster.properties.marker}
          />
        );
      })}
    </>
  );
};

export default ClusterGroup;
