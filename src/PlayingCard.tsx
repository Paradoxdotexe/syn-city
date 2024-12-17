import React from "react";
import "./PlayingCard.css";
import { ReactComponent as HeartIcon } from "./icons/Heart.svg";
import { ReactComponent as BrainIcon } from "./icons/Brain.svg";
import { ReactComponent as BoltIcon } from "./icons/Bolt.svg";
import { ReactComponent as ImageBorder } from "./icons/ImageBorder.svg";
import { ReactComponent as ImageGrid } from "./icons/ImageGrid.svg";
import { parse } from "marked";

type CardActionType = "activation" | "reaction" | "effect";

type CardAttributeKey =
  | "power"
  | "precision"
  | "protocol"
  | "persona"
  | "preservation"
  | "perception";

type CardAttributeType = "kinetic" | "neural" | "core";

export type SynCityCard = {
  actionType: CardActionType;
  actionCost: number;
  attributeKey: CardAttributeKey;
  attributeCost: number;
  name: string;
  description: string;
};

const ATTRIBUTE_TYPES: { [key in CardAttributeKey]: CardAttributeType } = {
  power: "kinetic",
  precision: "kinetic",
  protocol: "neural",
  persona: "neural",
  preservation: "core",
  perception: "core",
};

const ATTRIBUTE_TYPE_COLORS: { [key in CardAttributeType]: string } = {
  kinetic: "#CA84FF",
  neural: "#D4FF6F",
  core: "#3EFDD7",
};

const ATTRIBUTE_TYPE_ICONS: {
  [key in CardAttributeType]: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
} = {
  kinetic: BoltIcon,
  neural: BrainIcon,
  core: HeartIcon,
};

type PlayingCardProps = {
  card: SynCityCard;
  hoverable?: boolean;
};

export const PlayingCard: React.FC<PlayingCardProps> = (props) => {
  const attributeType = ATTRIBUTE_TYPES[props.card.attributeKey];
  const attributeTypeColor = ATTRIBUTE_TYPE_COLORS[attributeType];
  const AttributeTypeIcon = ATTRIBUTE_TYPE_ICONS[attributeType];

  return (
    <div
      className={`playingCard ${
        props.hoverable ? "playingCard--hoverable" : ""
      }`}
      style={{
        color: attributeTypeColor,
      }}
    >
      <div className="playingCard__bg bg--image" />
      <div
        className="playingCard__bg bg--overlay"
        style={{ background: attributeTypeColor }}
      />

      <div className="playingCard__header">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            className="header__attributeType"
            style={{ background: attributeTypeColor }}
          >
            <AttributeTypeIcon />
          </div>
          <div
            className="header__actionCost"
            style={{ color: attributeTypeColor }}
          >
            {props.card.actionCost}
          </div>
        </div>

        <div className="header__attribute">
          <div className="attribute__name">{props.card.attributeKey}</div>
          {props.card.attributeCost > 8 && (
            <div
              className="attribute__cost"
              style={{ background: attributeTypeColor }}
            />
          )}
          <div
            className="attribute__cost"
            style={{ background: attributeTypeColor }}
          >
            {[...new Array(8)].map((_, i) => {
              const bit = props.card.attributeCost % 8;
              return <div>{i < bit || bit === 0 ? "1" : "0"}</div>;
            })}
          </div>
        </div>
      </div>

      <div className="playingCard__image">
        <ImageBorder style={{ fill: attributeTypeColor }} />
        <ImageGrid className="image__grid" />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="playingCard__name">{props.card.name}</div>
        <div className="playingCard__actionType">[{props.card.actionType}]</div>
      </div>

      <div
        className="playingCard__description"
        dangerouslySetInnerHTML={{
          __html: parse(props.card.description) as string,
        }}
      />

      <div
        className="playingCard__footer"
        style={{ background: attributeTypeColor }}
      >
        <div>SynCityGame.com</div>
        <div>Copyright © 2025 Syn City</div>
      </div>
    </div>
  );
};
