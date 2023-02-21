import { Inter } from "@next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    grey: {
      "50": "#F9FAFB",
      "100": "#F2F4F7",
      "200": "#EAECF0",
      "300": "#D0D5DD",
      "400": "#98A2B3",
      "500": "#667085",
      "600": "#667085",
      "700": "#344054",
      "800": "#1D2939",
      "900": "#101828",
    },
    primary: {
      "50": "#EFF8FF",
      "100": "#D1E9FF",
      "200": "#B2DDFF",
      "300": "#84CAFF",
      "400": "#53B1FD",
      "500": "#2E90FA",
      "600": "#1570EF",
      "700": "#175CD3",
      "800": "#1849A9",
      "900": "#194185",
    },

    error: {
      "50": "#FEF3F2",
      "100": "#FEE4E2",
      "200": "#FECDCA",
      "300": "#FDA29B",
      "400": "#F97066",
      "500": "#F04438",
      "600": "#D92D20",
      "700": "#B42318",
      "800": "#912018",
      "900": "#7A271A",
    },
    warning: {
      "50": "#FFFAEB",
      "100": "#FEF0C7",
      "200": "#FEDF89",
      "300": "#FEC84B",
      "400": "#FDB022",
      "500": "#F79009",
      "600": "#DC6803",
      "700": "#B54708",
      "800": "#93370D",
      "900": "#7A2E0E",
    },
    success: {
      "50": "#ECFDF3",
      "100": "#D1FADF",
      "200": "#A6F4C5",
      "300": "#6CE9A6",
      "400": "#32D583",
      "500": "#12B76A",
      "600": "#039855",
      "700": "#027A48",
      "800": "#05603A",
      "900": "#054F31",
    },
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
