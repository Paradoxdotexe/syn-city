import React from "react";
import "./Card.css";
import { ReactComponent as BrainIcon } from "./icons/Brain.svg";
import { ReactComponent as ChipIcon } from "./icons/Chip.svg";
import { ReactComponent as ShieldIcon } from "./icons/Shield.svg";
import { ReactComponent as EyeIcon } from "./icons/Rocket.svg";
import { ReactComponent as FistIcon } from "./icons/Fist.svg";
import { ReactComponent as CrosshairIcon } from "./icons/Crosshair.svg";
import { ReactComponent as ImageBorder } from "./icons/ImageBorder.svg";
import { ReactComponent as ImageGrid } from "./icons/ImageGrid.svg";
import { parse } from "marked";

type CardActionType = "activate" | "condition" | "effect";

type CardAttributeKey =
  | "power"
  | "precision"
  | "protocol"
  | "persona"
  | "plating"
  | "propulsion";

export type SynCityCard = {
  actionType: CardActionType;
  actionCost: number;
  attributeKey: CardAttributeKey;
  attributeCost: number;
  name: string;
  description: string;
};

const KINETIC_COLOR = "#CA84FF";
const NEURAL_COLOR = "#D4FF6F";
const CORE_COLOR = "#3EFDD7";

const ATTRIBUTE_COLORS: { [key in CardAttributeKey]: string } = {
  power: KINETIC_COLOR,
  precision: KINETIC_COLOR,
  protocol: NEURAL_COLOR,
  persona: NEURAL_COLOR,
  plating: CORE_COLOR,
  propulsion: CORE_COLOR,
};

const ATTRIBUTE_ICONS: {
  [key in CardAttributeKey]: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
} = {
  power: FistIcon,
  precision: CrosshairIcon,
  protocol: ChipIcon,
  persona: BrainIcon,
  plating: ShieldIcon,
  propulsion: EyeIcon,
};

type CardProps = {
  card: SynCityCard;
  style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = (props) => {
  const color = ATTRIBUTE_COLORS[props.card.attributeKey];
  const Icon = ATTRIBUTE_ICONS[props.card.attributeKey];

  return (
    <div
      className="card"
      style={{
        color: color,
        ...props.style,
      }}
    >
      <div className="card__bg bg--image" />
      <div className="card__bg bg--overlay" style={{ background: color }} />

      <div className="card__header">
        <div className="header__actionCost" style={{ background: color }}>
          {props.card.actionCost}
        </div>

        <div className="header__attribute">
          <Icon />
          <div className="attribute__name">{props.card.attributeKey}</div>
          {props.card.attributeCost >= 8 && (
            <div className="attribute__cost" style={{ background: color }} />
          )}
          {props.card.attributeCost >= 16 && (
            <div className="attribute__cost" style={{ background: color }} />
          )}
          {props.card.attributeCost % 8 !== 0 && (
            <div className="attribute__cost" style={{ background: color }}>
              {[...new Array(8)].map((_, i) => {
                const bits = props.card.attributeCost % 8;
                return i < bits && <div>1</div>;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card__image">
        <ImageBorder style={{ fill: color }} />
        <ImageGrid className="image__grid" />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="card__name">{props.card.name}</div>
        <div className="card__actionType">[{props.card.actionType}]</div>
      </div>

      <div
        className="card__description"
        dangerouslySetInnerHTML={{
          __html: parse(props.card.description) as string,
        }}
      />

      <div className="card__footer" style={{ background: color }}>
        <div>SynCityGame.com</div>
        <div>Copyright © 2025 Syn City</div>
      </div>
    </div>
  );
};
