import { ChannelData } from "@/types";
import { DisasterVictimMarkers } from "./DisasterVictimMarkers";
import { HelpRequestMarkers } from "./HelpRequestMarkers";

type Props = {
  onMarkerClick: (_event: any, _markerData: ChannelData) => void;
};
export const MarkerLayer = ({ onMarkerClick }: Props) => {
  return (
    <>
      <DisasterVictimMarkers onMarkerClick={onMarkerClick} />
      <HelpRequestMarkers onMarkerClick={onMarkerClick} />
    </>
  );
};
