import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { ChannelData } from "@/types";
import { capitalize } from "@/utils/helpers";

export const FeedChannelGeneric = ({ channel, properties }: ChannelData) => {
  const { icon } = properties as { icon: string | null };

  return (
    <div style={styles.container}>
      <div style={styles.logo_container}>
        <Typography style={styles.logo}>{capitalize(channel)}</Typography>
        {icon && <img style={styles.icon} src={icon} alt={`${channel} icon`} />}
      </div>
      <Divider />
      {properties.description && (
        <Typography
          style={styles.description}
        >{`${properties.description}`}</Typography>
      )}
    </div>
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
