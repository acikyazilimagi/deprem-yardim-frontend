import Typography from "@mui/material/Typography";
import { FeedChannelBabalaProps } from "../../types";

const FeedChannelBabala = ({
  full_text,
  extra_parameters,
}: FeedChannelBabalaProps) => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.user}></div>
        <Typography style={styles.fullText}>{full_text}</Typography>
        <Typography style={styles.fullText}>
          {extra_parameters.status}
        </Typography>
        <Typography style={styles.confirmation}>
          {extra_parameters.manual_confirmation}
        </Typography>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "11px 15px 15px 15px",
    border: "1px solid rgb(207, 217, 222)",
    borderRadius: "12px",
    margin: "10px 0",
  },
  user: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 11,
  },
  avatarAndName: {
    display: "flex",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: "50%",
    backgroundColor: "#e1e8ed",
  },
  name: {
    display: "flex",
    flexDirection: "column" as "column",
    margin: "0 4px",
    justifyContent: "flex-end",
  },
  username: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontWeight: 800,
    fontSize: 14,
  },
  userIdArea: {
    display: "flex",
  },
  userText: {
    color: "rgb(83, 100, 113)",
    fontSize: 14,
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  dot: {
    padding: "0 4px",
    fontSize: 14,
  },
  followText: {
    color: "rgb(0, 111, 214)",
    fontSize: 14,
    fontWeight: 800,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  logo: {
    alignSelf: "flex-start",
  },
  fullText: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: 1.35,
  },
  confirmation: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    fontWeight: 800,
    color: "red",
    lineHeight: 1.35,
  },
};

export default FeedChannelBabala;
