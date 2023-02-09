import { Raw } from "@/mocks/TypesAreasEndpoint";
import Typography from "@mui/material/Typography";
import React from "react";
import TwitterLogo from "./TwitterLogo";

type Props = {
  source: Raw;
};

const PlaceholderTweet = ({ source }: Props) => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.user}>
          {source.name && (
            <div style={styles.avatarAndName}>
              <div style={styles.avatar}></div>
              <div style={styles.name}>
                <div style={styles.username}>{source.screen_name}</div>
                <div style={styles.userIdArea}>
                  <div style={styles.userText}>@{source.name}</div>
                  <div style={styles.dot}>·</div>
                  <div style={styles.followText}>Follow</div>
                </div>
              </div>
            </div>
          )}
          <div style={styles.logo}>
            <TwitterLogo />
          </div>
        </div>
        <Typography style={styles.fullText}>{source.full_text}</Typography>
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
};

export default PlaceholderTweet;
