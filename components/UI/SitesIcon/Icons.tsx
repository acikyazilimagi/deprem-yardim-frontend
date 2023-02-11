import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import styles from "./Icons.module.css";

const sites = [
  {
    href: "https://depremyardim.com/",
    name: "depremYardim",
    icon: "/icons/depremyardımIcon.svg",
    alt: "deprem yardim icon",
    popOverText: "site.depremyardim",
  },
  {
    href: "https://www.afetbilgi.com/",
    name: "afetBilgi",
    icon: "/icons/afetBilgiIcon.svg",
    alt: "afet bilgi icon",
    popOverText: "site.afetbilgi",
  },
  {
    href: "https://deprem.io/",
    name: "depremIO",
    icon: "/icons/depremIOIcon.svg",
    alt: "deprem io icon",
    popOverText: "site.depremio",
  },
  {
    href: "https://discord.gg/itdepremyardim",
    name: "discord",
    icon: "/icons/discordIcon.svg",
    alt: "discord icon",
    popOverText: "site.discord",
  },
];

const SitesIcon = () => {
  const { t } = useTranslation("common");
  const isMinWidth = useMediaQuery("(min-width:1024px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState<any>(null);
  const anchor = useRef(null);
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
    <Stack
      ref={anchor}
      id="sitesIcon"
      direction="row"
      spacing={2}
      className={styles.wrapper}
      sx={{
        display: isMinWidth ? "flex" : "none",
      }}
    >
      {sites.map((site) => (
        <Box key={site.name} sx={toBiggerIcon}>
          <Link
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handlePopoverOpen(site.name)}
            onMouseLeave={handlePopoverClose}
          >
            <Avatar sx={littleIcon} alt={site.alt} src={site.icon} />
          </Link>
          <Popover
            anchorReference="anchorEl"
            anchorEl={anchorEl}
            open={site.name === isOpen ? true : false}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
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
            <Typography sx={{ padding: "10px", width: "450px" }}>
              {t(site.popOverText)}
            </Typography>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default SitesIcon;
