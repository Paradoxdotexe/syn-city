import React, { ReactNode, useMemo } from 'react';
import './HeroCard.css';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { ReactComponent as ChipIcon } from './icons/Chip.svg';
import { ReactComponent as BatteryIcon } from './icons/Battery.svg';
import { ReactComponent as DataIcon } from './icons/Data.svg';
import { ReactComponent as GearIcon } from './icons/Gear.svg';
import { ReactComponent as LockIcon } from './icons/Lock.svg';
import { ReactComponent as SkullIcon } from './icons/Skull.svg';
import { ReactComponent as WarningIcon } from './icons/Warning.svg';
import reactStringReplace from 'react-string-replace';

export type HeroCardDefinition = {
  id: string;
  name: string;
  description: {
    front: string;
    back: string;
  };
  resources: {
    circuitCount: number;
    dataCount: number;
    batteryCount: number;
    gearCount: number;
  };
  activationNumber: number;
  quantity: number;
};

type HeroCardProps = {
  definition: HeroCardDefinition;
  flipped?: boolean;
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
              <Resource count={props.definition.resources.circuitCount} icon={ChipIcon} />
              <Resource count={props.definition.resources.dataCount} icon={DataIcon} />
              <Resource count={props.definition.resources.batteryCount} icon={BatteryIcon} />
              <Resource count={props.definition.resources.gearCount} icon={GearIcon} />
            </div>
            <div className="top__number">{props.definition.activationNumber}</div>
          </div>
        </div>
        <div className="content__info">
          <div className="info__safeZone">
            <div className="info__name">
              {props.flipped ? 'Supercharged' : ''}
              <br />
              {props.definition.name}
            </div>
            <div className="info__description">
              <Description
                description={props.definition.description[props.flipped ? 'back' : 'front']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ResourceProps = {
  count: number;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

export const Resource: React.FC<ResourceProps> = (props) => {
  if (!props.count) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: -7 }}>
        <div style={{ fontSize: 60, fontWeight: 'bold' }}>{props.count}</div>
      </div>
      <props.icon style={{ fontSize: 60 }} />
    </div>
  );
};

type DescriptionProps = {
  description: string;
};

export const Description: React.FC<DescriptionProps> = (props) => {
  const description = useMemo(() => {
    let description = reactStringReplace(props.description, /(ENEMY)/g, () => (
      <SkullIcon style={{ marginBottom: -4 }} />
    ));
    description = reactStringReplace(description, /(LOCK)/g, () => (
      <LockIcon style={{ marginBottom: -4 }} />
    ));
    description = reactStringReplace(description, /(HAZARD)/g, () => (
      <WarningIcon style={{ marginBottom: -4 }} />
    ));
    description = reactStringReplace(description, /\*\*(.+?)\*\*/g, (match) => (
      <strong style={{ whiteSpace: 'nowrap' }}>{match}</strong>
    ));
    return description;
  }, []);

  return description;
};
