import { DrawerContent } from "@/components/UI/Drawer/components/channels/DrawerContent";
import capitalize from "@mui/utils/capitalize";
import { FeedChannelPharmacyProps } from "../../types";

export const FeedChannelPharmacy = (props: FeedChannelPharmacyProps) => {
  const { reason, name, description } = props.properties;
  return (
    <DrawerContent>
      <DrawerContent.Header>
        <DrawerContent.Title>Eczane</DrawerContent.Title>
        <DrawerContent.Badge>{capitalize(reason || "")}</DrawerContent.Badge>
      </DrawerContent.Header>
      {name && <DrawerContent.Text>{name}</DrawerContent.Text>}
      {description && <DrawerContent.Text>{description}</DrawerContent.Text>}
    </DrawerContent>
  );
};
