import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { CHANNEL_AHBAP_TYPES } from "@/utils/constants";
import { FeedChannelAhbapProps } from "../../../types";

const getTypeLabel = (type: string) => {
  const id = type.split("-")[1];
  return CHANNEL_AHBAP_TYPES[id] ?? "";
};

export const FeedChannelAhbap = ({
  properties: { type = "", description = "", icon = "" },
}: FeedChannelAhbapProps) => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.logo_container}>
          <Typography style={styles.logo}>Ahbap</Typography>
          <img
            style={styles.icon}
            src={icon ?? ""}
            alt={getTypeLabel(type ?? "")}
          />
        </div>
        <Divider />
        {type && (
          <Typography style={styles.name}>
            {getTypeLabel(type ?? "")}
          </Typography>
        )}
        {description && (
          <Typography style={styles.description}>{`${description}`}</Typography>
        )}
      </div>
    </>
  );
};

const styles = {
  logo_container: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logo: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 800,
  },
  icon: {
    width: 28,
    height: 28,
  },
  container: {
    padding: "11px 15px 40px 15px",
    margin: "10px 0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
  },
  name: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.35,
    marginTop: 20,
  },
  description: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.35,
    marginTop: 20,
  },
};
