import React from "react";
import "./App.css";
import { PlayingCard } from "./PlayingCard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 16,
      }}
    >
      <PlayingCard
        attribute={{ key: "preservation", cost: 9 }}
        name="Auxiliary Power"
        description="When you are reduced to 0 **SYNERGY**, regain **8 SYNERGY** instead of shutting down."
        action="CONSUME"
      />
      <PlayingCard
        attribute={{ key: "preservation", cost: 9 }}
        name="Auxiliary Power 2"
        description="When you are reduced to 0 **SYNERGY**, regain **8 SYNERGY** instead of shutting down."
        action="CONSUME"
      />
      <PlayingCard
        attribute={{ key: "preservation", cost: 9 }}
        name="Auxiliary Power 3"
        description="When you are reduced to 0 **SYNERGY**, regain **8 SYNERGY** instead of shutting down."
        action="CONSUME"
      />
      <PlayingCard
        attribute={{ key: "preservation", cost: 9 }}
        name="Auxiliary Power 4"
        description="When you are reduced to 0 **SYNERGY**, regain **8 SYNERGY** instead of shutting down."
        action="CONSUME"
      />
    </div>
  );
}

export default App;
