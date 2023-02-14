import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import capitalize from "@mui/utils/capitalize";

interface FeedChannelPharmacyProps {
  channel: string;
  properties: {
    name: string;
    description: string;
    icon: string;
  };
  id: number;
  reason: string;
  verified: string;
}

export const FeedChannelPharmacy = (props: FeedChannelPharmacyProps) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>Eczane</DrawerContent.Title>
        <DrawerContent.Badge>
          {capitalize(props?.reason || "")}
        </DrawerContent.Badge>
      </DrawerContent.Header>
      <DrawerContent.Text>{props.properties.name}</DrawerContent.Text>
      <DrawerContent.Text>{props.properties.description}</DrawerContent.Text>
    </DrawerContent>
  );
};
