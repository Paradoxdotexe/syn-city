import React from "react";
import "./App.css";
import { PlayingCard } from "./PlayingCard";
import { InteractiveElement } from "./InteractiveElement";
import { SYN_CITY_CARDS } from "./sync-city-cards";

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
      <InteractiveElement id="Auxiliary Power">
        <PlayingCard card={SYN_CITY_CARDS[0]} />
      </InteractiveElement>
    </div>
  );
}

export default App;
