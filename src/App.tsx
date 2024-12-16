import React from "react";
import "./App.css";
import { PlayingCard } from "./PlayingCard";
import { InteractiveElement } from "./InteractiveElement";

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
      <PlayingCard
        attribute={{ key: "protocol", cost: 2 }}
        name="Sabotage"
        description="Roll a **Protocol** contest to hack a target at Far range. On a success, the target takes **1** damage."
        action="ACTIVATE"
        hoverable
      />

      <PlayingCard
        attribute={{ key: "precision", cost: 8 }}
        name="Uncanny Dodge"
        description="When you are targeted by a ranged attack, roll a **Precision** check to dodge. On a success, you take no damage."
        action="CONSUME"
        hoverable
      />
      <InteractiveElement id="Auxiliary Power">
        <PlayingCard
          attribute={{ key: "preservation", cost: 9 }}
          name="Auxiliary Power"
          description="When you are reduced to 0 **SYNERGY**, regain **8 SYNERGY** instead of shutting down."
          action="CONSUME"
        />
      </InteractiveElement>
    </div>
  );
}

export default App;
