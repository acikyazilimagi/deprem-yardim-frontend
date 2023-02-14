import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import { findTagByClusterCount } from "../Tag/Tag.types";

type Props = {
  data: any[];
};

const fetchIcon = (count: number) => {
  const tag = findTagByClusterCount(count);

  return L.divIcon({
    html: `<div class="cluster-inner"><span>${count}</span></div>`,
    className: `leaflet-marker-icon marker-cluster leaflet-interactive leaflet-custom-cluster-${tag.id}`,
  });
};

const emptyIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

export const SahraKitchenClusterGroup = ({ data }: Props) => {
  const { handleMarkerClick } = useMapClickHandlers();
  const map = useMap();

  const bounds = map.getBounds();

  const { clusters, supercluster } = useSupercluster({
    points: data,
    bounds: [
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat,
    ],
    zoom: map.getZoom(),
    options: { radius: 10, maxZoom: 17 },
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
            icon={L.icon({
              iconUrl: cluster.properties.icon || emptyIcon,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            })}
            eventHandlers={{
              click: (e) => {
                // @ts-ignore
                handleMarkerClick(e, {
                  channel: "sahra_mutfak",
                  // @ts-ignore
                  properties: {
                    description: cluster.properties.reason ?? "",
                    name: cluster.properties.name ?? "",
                  },
                  id: cluster.id,
                  reason: cluster.reason,
                  verified: cluster.verified,
                  geometry: {
                    location: {
                      lng: longitude,
                      lat: latitude,
                    },
                  },
                });
              },
            }}
          />
        );
      })}
    </>
  );
};
