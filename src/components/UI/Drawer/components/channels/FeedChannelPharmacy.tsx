import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import capitalize from "@mui/utils/capitalize";
import { FeedChannelPharmacyProps } from "../../types";

export const FeedChannelPharmacy = (props: FeedChannelPharmacyProps) => {
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>Eczane</DrawerContent.Title>
        <DrawerContent.Badge>
          {capitalize(props.properties.reason || "")}
        </DrawerContent.Badge>
      </DrawerContent.Header>
      <DrawerContent.Text>{props.properties.name}</DrawerContent.Text>
      <DrawerContent.Text>{props.properties.description}</DrawerContent.Text>
    </DrawerContent>
  );
};
