import React, { useEffect, useState } from "react";
import "./PlayingCard.css";
import { ReactComponent as HeartIcon } from "./icons/Heart.svg";
import { ReactComponent as BrainIcon } from "./icons/Brain.svg";
import { ReactComponent as BoltIcon } from "./icons/Bolt.svg";
import { ReactComponent as ImageBorder } from "./icons/ImageBorder.svg";
import { ReactComponent as ImageGrid } from "./icons/ImageGrid.svg";
import { parse } from "marked";

type AttributeKey =
  | "power"
  | "precision"
  | "protocol"
  | "persona"
  | "preservation"
  | "perception";

type AttributeType = "kinetic" | "neural" | "core";

const ATTRIBUTE_TYPES: { [key in AttributeKey]: AttributeType } = {
  power: "kinetic",
  precision: "kinetic",
  protocol: "neural",
  persona: "neural",
  preservation: "core",
  perception: "core",
};

const ATTRIBUTE_TYPE_COLORS: { [key in AttributeType]: string } = {
  kinetic: "#CA84FF",
  neural: "#D4FF6F",
  core: "#3EFDD7",
};

const ATTRIBUTE_TYPE_ICONS: {
  [key in AttributeType]: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
} = {
  kinetic: BoltIcon,
  neural: BrainIcon,
  core: HeartIcon,
};

type PlayingCardProps = {
  attribute: {
    key: AttributeKey;
    cost: number;
  };
  name: string;
  description: string;
  action: "ACTIVATE" | "CONSUME";
};

const HOVER_INTENSITY = 10;

export const PlayingCard: React.FC<PlayingCardProps> = (props) => {
  const attributeType = ATTRIBUTE_TYPES[props.attribute.key];
  const attributeTypeColor = ATTRIBUTE_TYPE_COLORS[attributeType];
  const AttributeTypeIcon = ATTRIBUTE_TYPE_ICONS[attributeType];

  const [hoverWeight, setHoverWeight] = useState<{ x: number; y: number }>();
  const [glarePoint, setGlarePoint] = useState<{ x: number; y: number }>();
  const [centerPoint, setCenterPoint] = useState<{ x: number; y: number }>();

  useEffect(() => {
    const element = document.getElementById(props.name);
    const elementBox = element!.getBoundingClientRect();

    if (!centerPoint) {
      setCenterPoint({
        x: elementBox.left + elementBox.width / 2,
        y: elementBox.top + elementBox.height / 2,
      });
    }

    const onMouseMove = (event: any) => {
      if (
        event.clientX > elementBox.left &&
        event.clientX < elementBox.right &&
        event.clientY > elementBox.top &&
        event.clientY < elementBox.bottom
      ) {
        const xRatio = (event.clientX - elementBox.left) / elementBox.width;
        const yRatio = (event.clientY - elementBox.top) / elementBox.height;
        setHoverWeight({ x: (xRatio - 0.5) * 2, y: (0.5 - yRatio) * 2 });
        setGlarePoint({ x: (0.75 - xRatio) * 100, y: (1 - yRatio) * 100 });
      } else {
        setHoverWeight(undefined);
        setGlarePoint(undefined);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      id={props.name}
      style={{
        perspective: 800,
        perspectiveOrigin: "center center",
        padding: 16,
        width: "fit-content",
      }}
    >
      <div
        className="playingCard"
        style={{
          color: attributeTypeColor,
          transform: hoverWeight
            ? `scale(1.1) rotateY(${
                hoverWeight.x * HOVER_INTENSITY
              }deg) rotateX(${hoverWeight.y * HOVER_INTENSITY}deg)`
            : "scale(1) rotateY(0) rotateX(0)",
          transition: !hoverWeight ? "transform 150ms ease" : undefined,
        }}
      >
        <div className="playingCard__bg bg--image" />
        <div
          className="playingCard__bg bg--overlay"
          style={{ background: attributeTypeColor }}
        />
        <div
          className="playingCard__bg bg--glare"
          style={{
            background:
              glarePoint &&
              `radial-gradient(circle at ${glarePoint.x}% ${glarePoint.y}%, rgba(255, 253, 229, 0.05) 25%, transparent 75%)`,
          }}
        />

        <div className="playingCard__header">
          <div
            className="header__attributeType"
            style={{ background: attributeTypeColor }}
          >
            <AttributeTypeIcon />
          </div>

          <div className="header__attribute">
            <div className="attribute__name">{props.attribute.key}</div>
            {props.attribute.cost > 8 && (
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
                const bit = props.attribute.cost % 8;
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
          <div className="playingCard__name">{props.name}</div>
          <div className="playingCard__action">[{props.action}]</div>
        </div>

        <div
          className="playingCard__description"
          dangerouslySetInnerHTML={{
            __html: parse(props.description) as string,
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
    </div>
  );
};
