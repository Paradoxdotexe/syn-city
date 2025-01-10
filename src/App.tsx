import React, { ReactNode } from 'react';
import './App.css';
import { LOCATION_CARDS } from './location-cards';
import { LocationCard } from './LocationCard';
import { RESOURCE_CARDS } from './resource-cards';
import { ResourceCard } from './ResourceCard';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardGrid>
        {/* {LOCATION_CARDS.filter((l) => ["604"].includes(l.id)).map(
          (definition, i) => (
            <LocationCard key={i} definition={definition} />
          )
        )} */}
        {RESOURCE_CARDS.filter((r) => ['32'].includes(r.id)).map((definition, i) => (
          <ResourceCard key={i} definition={definition} />
        ))}
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
