import { useState } from "react";
import SearchInput from "./SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useDevice } from "@/stores/mapStore";

export default function SearchArea() {
  const [toggleState, setToggleState] = useState(false);
  const device = useDevice();

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: device === "mobile" && toggleState === true ? "0px" : "10px",
        width: device === "mobile" && toggleState === true ? "100%" : undefined,
        zIndex: 10000,

        backgroundColor: "white",
        borderRadius: "10%",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      {!toggleState ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
          onClick={() => setToggleState(true)}
        >
          <SearchIcon />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px 10px",
            width: device === "mobile" ? "100%" : "300px",
          }}
        >
          <SearchInput
            close={() => {
              setToggleState(false);
            }}
          />
          <CloseIcon
            onClick={() => {
              setToggleState(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
