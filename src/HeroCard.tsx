import React, { ReactNode } from 'react';
import './HeroCard.css';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { ReactComponent as ChipIcon } from './icons/Chip.svg';
import { ReactComponent as BatteryIcon } from './icons/Battery.svg';
import { ReactComponent as DataIcon } from './icons/Data.svg';
import { ReactComponent as ShieldIcon } from './icons/Shield.svg';

export type HeroCardDefinition = {
  id: string;
  name: string;
  description: {
    front: ReactNode;
    back: ReactNode;
  };
  resources: {
    circuitCount: number;
    dataCount: number;
    batteryCount: number;
    plateCount: number;
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
            <div className="top__resources">
              {[...new Array(props.definition.resources.circuitCount)].map((_, i) => (
                <ChipIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.resources.dataCount)].map((_, i) => (
                <DataIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.resources.batteryCount)].map((_, i) => (
                <BatteryIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.resources.plateCount)].map((_, i) => (
                <ShieldIcon key={i} style={{ fontSize: 60 }} />
              ))}
            </div>
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
