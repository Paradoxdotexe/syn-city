import React from "react";
import "./App.css";
import { SYN_CITY_CARDS } from "./sync-city-cards";
import { CardHand } from "./CardHand";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 32,
      }}
    >
      <CardHand cards={SYN_CITY_CARDS} />
    </div>
  );
}

export default App;
