import React from "react";
import Map from "@/components/UI/Map/Map";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import dynamic from "next/dynamic";
import { DEFAULT_CENTER, DEFAULT_ZOOM, DEFAULT_IMPORTANCY } from "./utils";
import { MarkerData } from "../../../mocks/types";

const MarkerClusterGroup = dynamic(() => import("./MarkerClusterGroup"), {
  ssr: false,
});

const MapLegend = dynamic(() => import("./MapLegend"), {
  ssr: false,
});

type Props = {
  data: MarkerData[];
  onClickMarker: (
    // eslint-disable-next-line no-unused-vars
    e: React.KeyboardEvent | React.MouseEvent,
    // eslint-disable-next-line no-unused-vars
    markerData: MarkerData
  ) => void;
};

function LeafletMap({ onClickMarker, data }: Props) {
  return (
    <>
      <MapLegend />
      <Map center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
        {({ TileLayer, Marker }: any, _: any, HeatmapLayer: any) => (
          <>
            <TileLayer
              url={`http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
            />
            <MarkerClusterGroup>
              {data.map((marker: MarkerData, index) => (
                <React.Fragment key={index}>
                  <Marker
                    key={marker.place_id}
                    position={[
                      marker.geometry.location.lat,
                      marker.geometry.location.lng,
                    ]}
                    eventHandlers={{
                      click: (e: any) => {
                        onClickMarker(e, marker);
                      },
                    }}
                  />

                  <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    radius={15}
                    points={[
                      [
                        marker.geometry.location.lat,
                        marker.geometry.location.lng,
                        DEFAULT_IMPORTANCY,
                      ],
                    ]}
                    longitudeExtractor={(m: any) => m[1]}
                    latitudeExtractor={(m: any) => m[0]}
                    intensityExtractor={(m: any) => parseFloat(m[2])}
                  />
                </React.Fragment>
              ))}
            </MarkerClusterGroup>
          </>
        )}
      </Map>
    </>
  );
}

export default LeafletMap;
