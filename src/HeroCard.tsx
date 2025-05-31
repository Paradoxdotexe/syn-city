import React, { useMemo } from 'react';
import './HeroCard.css';
import { ReactComponent as EnergyIcon } from './icons/Battery.svg';
import { ReactComponent as GearIcon } from './icons/Gear.svg';
import { ReactComponent as LockIcon } from './icons/Lock.svg';
import { ReactComponent as SkullIcon } from './icons/Skull.svg';
import { ReactComponent as WarningIcon } from './icons/Warning.svg';
import reactStringReplace from 'react-string-replace';

export type HeroCardDefinition = {
  id: string;
  name: string;
  description: string;
  scrapCost: number;
  energyCost: number;
  quantity: number;
};

type HeroCardProps = {
  definition: HeroCardDefinition;
  style?: React.CSSProperties;
};

export const HeroCard: React.FC<HeroCardProps> = (props) => {
  return (
    <div className="heroCard" style={props.style}>
      <div className="heroCard__content">
        <div className="content__top">
          <div className="top__safeZone">
            <div className="top__resources">
              <Resource count={props.definition.scrapCost} icon={GearIcon} />
            </div>
            <div className="top__number">{props.definition.energyCost}</div>
          </div>
        </div>
        <div className="content__info">
          <div className="info__safeZone">
            <div className="info__name">{props.definition.name}</div>
            <div className="info__description">
              <Description description={props.definition.description} />
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
    description = reactStringReplace(description, /(ENERGY)/g, () => (
      <EnergyIcon style={{ marginBottom: -4 }} />
    ));
    description = reactStringReplace(description, /(SCRAP)/g, () => (
      <GearIcon style={{ marginBottom: -4 }} />
    ));
    description = reactStringReplace(description, /\*\*(.+?)\*\*/g, (match) => (
      <strong style={{ whiteSpace: 'nowrap' }}>{match}</strong>
    ));
    description = reactStringReplace(description, /\*\*(.+?)\*\*/g, (match) => (
      <strong style={{ whiteSpace: 'nowrap' }}>{match}</strong>
    ));
    return description;
  }, []);

  return description;
};
