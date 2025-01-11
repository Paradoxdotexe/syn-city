import React, { ReactNode, useEffect } from "react";
import "./App.css";
import { LOCATION_CARDS } from "./location-cards";
import { LocationCard } from "./LocationCard";
import { REWARD_CARDS } from "./reward-cards";
import { RewardCard } from "./RewardCard";

function App() {
  // helper for generating location barriers
  // useEffect(() => {
  //   let barriers = "D D H E E E H".split(" ");
  //   for (let i = 0; i < 7; i++) {
  //     console.log(barriers);
  //     if (i % 2 === 0) {
  //       barriers = barriers.slice(0, -1);
  //     } else {
  //       barriers = barriers.slice(1);
  //     }
  //     for (let j = 0; j < barriers.length; j++) {
  //       if (barriers[j] === "E") {
  //         barriers[j] = "D";
  //       } else if (barriers[j] === "D") {
  //         barriers[j] = "H";
  //       } else if (barriers[j] === "H") {
  //         barriers[j] = "E";
  //       }
  //     }
  //   }
  // }, []);

  // helper to ensure barriers are well balanced
  // useEffect(() => {
  //   const counts = {
  //     E: 0,
  //     D: 0,
  //     H: 0,
  //   };
  //   for (const location of LOCATION_CARDS) {
  //     for (const barrier of location.barriers) {
  //       counts[barrier]++;
  //     }
  //   }
  //   console.log(counts);
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardGrid>
        {LOCATION_CARDS.map((definition) => (
          <LocationCard key={`${definition.id}`} definition={definition} />
        ))}
        {REWARD_CARDS.map((definition) =>
          [...new Array(definition.quantity)].map((_, i) => (
            <RewardCard key={`${definition.id}#${i}`} definition={definition} />
          ))
        )}
      </CardGrid>
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

const CardGrid: React.FC<{
  children: ReactNode;
  style?: React.CSSProperties;
}> = (props) => {
  return (
    <div
      className="cardGrid"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
