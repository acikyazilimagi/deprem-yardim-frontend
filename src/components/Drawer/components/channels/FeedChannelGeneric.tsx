import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { ChannelData } from "@/types";

export const FeedChannelGeneric = ({ properties }: ChannelData) => {
  return (
    <div style={styles.container}>
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
  container: {
    padding: "11px 15px 40px 15px",
    margin: "10px 0",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
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
