import L from "leaflet";
import { Marker, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";
import { findTagByClusterCount } from "../Tag/Tag.types";
import { ChannelData } from "@/types";

const fetchIcon = (count: number) => {
  const tag = findTagByClusterCount(count);

  return L.divIcon({
    html: `<div class="cluster-inner"><span>${count}</span></div>`,
    className: `leaflet-marker-icon marker-cluster leaflet-interactive leaflet-custom-cluster-${tag.id}`,
  });
};

const emptyIcon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

// const DEFAULT_PROPERTY_MAP = {
//   name: "name",
//   description: "description",
//   type: "styleUrl",
//   icon: "icon",
// };

// const prepareProperties = (properties: any, propertyMap: any) => {
//   const preparedProperties = {};

//   Object.keys(propertyMap).forEach((key) => {
//     // @ts-ignore
//     preparedProperties[key] = properties[propertyMap[key]];
//   });

//   return preparedProperties;
// };

type Props = {
  data: ChannelData[];
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};

export const GenericClusterGroup = ({
  data,
  onMarkerClick,
}: // propertyMap = DEFAULT_PROPERTY_MAP,
Props) => {
  const map = useMap();

  const bounds = map.getBounds();

  console.debug(data);
  const geoJSON = data.map((item) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.geometry.location.lat, item.geometry.location.lng],
      },
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
                onMarkerClick(e, cluster);
              },
            }}
          />
        );
      })}
    </>
  );
};
