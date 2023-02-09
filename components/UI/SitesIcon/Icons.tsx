import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

import React from "react";

const webSiteLinks = [
  {
    name: "depremYardim",
    link: "https://depremyardim.com/",
    avatar: "/icons/depremyardımIcon.svg",
    alt: "deprem yardim icon",
    text: "Depremzedeleri aramak ve yardım etmek için kullandığımız site.",
  },
  {
    name: "depremIO",
    link: "https://deprem.io/",
    avatar: "/icons/depremIOIcon.svg",
    alt: "deprem io icon",
    text: "Depremzedelere erzak yardımı için kullandığımız site.",
  },
  {
    name: "depremDiscord",
    link: "https://discord.gg/itdepremyardim",
    avatar: "/icons/discordIcon.svg",
    alt: "discord icon",
    text: "Projelerimizi geliştirmek ve birbirimizle iletişim kurmak için kullandığımız Discord sunucusu.",
  },
];

const SitesIcon = () => {
  const isMinWidth = useMediaQuery("(min-width:1024px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<any>(null);
  const anchor = React.useRef(null);
  const handlePopoverOpen = (Popover: string) => {
    const element = anchor;
    setAnchorEl(element.current);
    setIsOpen(Popover);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(null);
  };
  // I make this way because = https://smartdevpreneur.com/4-mui-sx-hover-examples/
  const toBiggerIcon = {
    "&:hover": {
      transform: "scale(1.2)",
    },
    "&": {
      transition: "all 0.3s ease-in-out",
    },
  };

  const littleIcon = {
    width: 28,
    height: 28,
  };

  return (
    <>
      <Stack
        ref={anchor}
        id="sitesIcon"
        direction="row"
        spacing={2}
        sx={{
          display: isMinWidth ? "flex" : "none",
          background: "rgba(220, 20, 60, 0.5)",
          padding: "10px",
          borderRadius: "10px",
          position: "absolute",
          top: "10px",
          right: "70px",
          zIndex: 500,
        }}
      >
        {webSiteLinks.map((item) => (
          <Box key={item.name} sx={toBiggerIcon}>
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => handlePopoverOpen(item.name)}
              onMouseLeave={handlePopoverClose}
            >
              <Avatar sx={littleIcon} alt={item.alt} src={item.avatar} />
            </Link>
            <Popover
              anchorReference="anchorEl"
              anchorEl={anchorEl}
              open={item.name === isOpen ? true : false}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                background: "#00000000",
                pointerEvents: "none",
                zIndex: 600,
              }}
              onClose={handlePopoverClose}
            >
              <Typography
                fontSize={14}
                sx={{ padding: "10px", width: "450px" }}
              >
                {item.text}
              </Typography>
            </Popover>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default SitesIcon;
