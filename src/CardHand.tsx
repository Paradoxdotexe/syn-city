import { Card, SynCityCard } from "./Card";
import React, { useState } from "react";
import "./CardHand.css";
import { InteractiveElement } from "./InteractiveElement";

type CardHandProps = {
  cards: SynCityCard[];
};

export const CardHand: React.FC<CardHandProps> = (props) => {
  const [hoverIndex, setHoverIndex] = useState<number>();

  const getRelativeIndex = (index: number) => {
    return index - (props.cards.length - 1) / 2;
  };

  return (
    <div
      style={{ position: "relative", height: 561, width: 411 }}
      className="cardHand"
    >
      {props.cards.map((card, i) => {
        const relativeIndex = getRelativeIndex(i);
        const isHovered = hoverIndex === i;

        return (
          <div
            className="cardHand__cardContainer"
            style={{
              position: "absolute",
              marginLeft: relativeIndex * 350,
              marginTop: Math.pow(Math.abs(relativeIndex), 1.6) * 25,
              transform: `scale(${isHovered ? 1.25 : 1})rotateZ(${
                relativeIndex * (hoverIndex === i ? 1.5 : 3)
              }deg)`,
            }}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(undefined)}
          >
            <InteractiveElement id={`card-${relativeIndex}`} intensity={4}>
              <Card
                card={card}
                style={{ boxShadow: "0 0 16px 8px rgba(0, 0, 0, 0.25)" }}
              />
            </InteractiveElement>
          </div>
        );
      })}
    </div>
  );
};
