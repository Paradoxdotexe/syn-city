import React, { ReactNode } from 'react';
import './HeroCard.css';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

export type HeroCardDefinition = {
  id: string;
  name: string;
  description: {
    front: ReactNode;
    back: ReactNode;
  };
  activationNumber: number;
  quantity: number;
};

type HeroCardProps = {
  definition: HeroCardDefinition;
  style?: React.CSSProperties;
};

export const HeroCard: React.FC<HeroCardProps> = (props) => {
  const elementId = `R${props.definition.id}`;

  return (
    <div
      id={elementId}
      className="heroCard"
      style={props.style}
      onClick={() => {
        toPng(document.getElementById(elementId)!, {
          pixelRatio: 1,
        }).then((dataUrl) =>
          download(dataUrl, `${elementId}[face,${props.definition.quantity}].png`)
        );
      }}
    >
      <div className="heroCard__content">
        <div className="content__top">
          <div className="top__safeZone">
            <div className="top__number">{props.definition.activationNumber}</div>
          </div>
        </div>
        <div className="content__info">
          <div className="info__safeZone">
            <div className="info__name">{props.definition.name}</div>
            <div className="info__description">{props.definition.description.front}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
