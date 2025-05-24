import React, { ReactNode, useEffect } from 'react';
import './App.css';
import { LOCATION_CARDS } from './location-cards';
import { LocationCard } from './LocationCard';
import { HeroCard } from './HeroCard';
import { HERO_CARDS } from './hero-cards';

function App() {
  // helper to count barriers and resources
  // useEffect(() => {
  //   const barriers = {
  //     ENEMY: 0,
  //     LOCK: 0,
  //     HAZARD: 0,
  //   };
  //   const resources = {
  //     ENERGY: 0,
  //     UPGRADE: 0,
  //     RESOURCE: 0,
  //   };
  //   for (const location of LOCATION_CARDS) {
  //     barriers.ENEMY += location.enemyCount;
  //     barriers.LOCK += location.lockCount;
  //     barriers.HAZARD += location.hazardCount;
  //     resources.ENERGY += location.energyCount;
  //     resources.UPGRADE += location.upgradeCount;
  //     resources.RESOURCE += location.resourceCount;
  //   }
  //   console.log({ barriers, resources });
  // }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardGrid>
        {LOCATION_CARDS.map((definition) =>
          [...new Array(definition.quantity)].map((_, i) => (
            <LocationCard key={`${definition.id}#${i}`} definition={definition} />
          ))
        )}
      </CardGrid>
      {/* {Array.from({ length: Math.ceil(HERO_CARDS.length / 8) }).map((_, groupIdx) => {
        const cards = HERO_CARDS.slice(groupIdx * 8, groupIdx * 8 + 8);
        return (
          <React.Fragment key={groupIdx}>
            <CardGrid>
              {cards.map((definition, i) => (
                <HeroCard
                  key={`${definition.id}#${i + groupIdx * 8}-front`}
                  definition={definition}
                />
              ))}
            </CardGrid>
            <CardGrid style={{ flexDirection: 'row-reverse' }}>
              {cards.map((definition, i) => (
                <HeroCard
                  key={`${definition.id}#${i + groupIdx * 8}-back`}
                  definition={definition}
                  flipped
                />
              ))}
            </CardGrid>
          </React.Fragment>
        );
      })} */}
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
        display: 'flex',
        flexWrap: 'wrap',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
