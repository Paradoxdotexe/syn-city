import React from "react";
import "./App.css";
import { PlayingCard } from "./PlayingCard";

function App() {
  return (
    <div>
      <PlayingCard
        attribute={{ key: "preservation", cost: 9 }}
        name="Auxiliary Power"
        description="When you are reduced to 0 **SYNERGY**, regain **8 SYNERGY** instead of shutting down."
        action="CONSUME"
      />
    </div>
  );
}

export default App;
