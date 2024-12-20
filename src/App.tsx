import React from "react";
import "./App.css";
import { SYN_CITY_CARDS } from "./sync-city-cards";
import { CardHand } from "./CardHand";
import { Card } from "./Card";

function App() {
  return (
    <div
      style={{
        padding: 32,
        display: "flex ",
        flexWrap: "wrap",
        gap: 32,
      }}
    >
      {SYN_CITY_CARDS.map((card) => (
        <Card card={card} />
      ))}
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       height: "100vh",
  //       gap: 32,
  //     }}
  //   >
  //     <CardHand cards={SYN_CITY_CARDS.slice(0, 5)} />
  //   </div>
  // );
}

export default App;
