import { Paper } from "@mui/material";
import LocationAutocomplete from "./LocationAutocomplete";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <Paper elevation={4} className={styles.searchBar}>
      <LocationAutocomplete />
    </Paper>
  );
};

export default SearchBar;
