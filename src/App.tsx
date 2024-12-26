import React from 'react';
import './App.css';
import { SYN_CITY_CARDS } from './sync-city-cards';
import { CardHand } from './CardHand';
import { Card } from './Card';
import { LOCATION_CARDS } from './location-cards';
import { LocationCard } from './LocationCard';

function App() {
  return (
    <div
      style={{
        padding: 32,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
      }}
    >
      {/* {SYN_CITY_CARDS.slice(1).filter(card => card.visible).map((card) => (
        <Card card={card} />
      ))} */}
      {LOCATION_CARDS.map((definition, i) => (
        <LocationCard key={i} definition={definition} />
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
