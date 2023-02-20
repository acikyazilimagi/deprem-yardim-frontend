import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import { findTagByClusterCount } from "../Tag/Tag.types";
import { ChannelData } from "@/types";
import styles from "./Map.module.css";
import { useRouter } from "next/router";
import { usePrevious } from "@/hooks/usePrevious";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ApiClient } from "@/services/ApiClient";
import { getFetchAreaBound } from "@/utils/getFetchAreaBound";
import { isValidReasons } from "@/utils/isValidReasons";

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

type Props = {
  data: ChannelData[];
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
  apiClient: ApiClient | null; // TOFIX: remove null when we migrate into new UI
  setLocations: Dispatch<SetStateAction<ChannelData[]>>;
};

export const GenericClusterGroup = ({
  data,
  onMarkerClick,
  apiClient,
  setLocations,
}: // propertyMap = DEFAULT_PROPERTY_MAP,
Props) => {
  const map = useMap();
  const bounds = map.getBounds();

  const router = useRouter();
  const queryReasons = router.query.reasons as string | undefined;
  const prevReasons = usePrevious(queryReasons);

  useEffect(() => {
    if (!apiClient) {
      return; // TOFIX: remove this when we migrate into new UI, will not be needed
    }
    if (isValidReasons(queryReasons) && prevReasons !== queryReasons) {
      apiClient
        .fetchAreas({ reasons: queryReasons, bound: getFetchAreaBound(bounds) })
        .then(setLocations);
    }
  }, [apiClient, prevReasons, queryReasons, bounds]);

  const geoJSON = data.map((item) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.geometry.location.lat, item.geometry.location.lng],
      },
      item,
      properties: item.properties,
    };
  });

  const { clusters, supercluster } = useSupercluster({
    points: geoJSON,
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
      {clusters.map((cluster, idx) => {
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
          <Marker
            key={`cluster-${idx}`}
            position={[latitude, longitude]}
            icon={
              cluster.properties.icon
                ? L.icon({
                    iconUrl: "/" + cluster.properties.icon,
                    iconSize: [28, 28],
                    iconAnchor: [14, 14],
                  })
                : new markerBlueIcon()
            }
            eventHandlers={{
              click: (e) => {
                onMarkerClick(e, cluster.item);
              },
            }}
          />
        );
      })}
    </>
  );
};
