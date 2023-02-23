import { ChannelData } from "@/types";
import { DisasterVictimMarkers } from "./DisasterVictimMarkers";

type Props = {
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};
export const MarkerLayer = ({ onMarkerClick }: Props) => {
  return (
    <>
      <DisasterVictimMarkers onMarkerClick={onMarkerClick} />
    </>
  );
};
