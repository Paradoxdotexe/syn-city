import React from 'react';
import './LocationCard.css';
import { ReactComponent as GearIcon } from './icons/Gear.svg';
import { ReactComponent as LockIcon } from './icons/Lock.svg';
import { ReactComponent as SkullIcon } from './icons/Skull.svg';
import { ReactComponent as WarningIcon } from './icons/Warning.svg';
import { ReactComponent as AtomIcon } from './icons/Atom.svg';

export type LocationCardDefinition = {
  id: string;
  area: string;
  name: string;
  barriers: {
    enemyCount: number;
    lockCount: number;
    hazardCount: number;
  };
  scrapCount: number;
  quantumCoreCount: number;
  quantity: number;
};

type LocationCardProps = {
  definition: LocationCardDefinition;
  style?: React.CSSProperties;
};

export const LocationCard: React.FC<LocationCardProps> = (props) => {
  const elementId = `R${props.definition.id}`;

  return (
    <div id={elementId} className="locationCard" style={props.style}>
      <div className="locationCard__content">
        <div className="content__top">
          <div className="top__safeZone">
            <div className="top__barriers">
              <Barrier count={props.definition.barriers.enemyCount} icon={SkullIcon} />
              <Barrier count={props.definition.barriers.lockCount} icon={LockIcon} />
              <Barrier count={props.definition.barriers.hazardCount} icon={WarningIcon} />
            </div>
            <div className="top__area">{props.definition.area}</div>
          </div>
        </div>
        <div className="content__info">
          <div className="info__safeZone">
            <div className="info__name">{props.definition.name}</div>
            <div className="info__resources">
              {/* {[...new Array(props.definition.scrapCount)].map((_, i) => (
                <GearIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.quantumCoreCount)].map((_, i) => (
                <AtomIcon key={i} style={{ fontSize: 60 }} />
              ))} */}

              <Resource count={props.definition.scrapCount} icon={GearIcon} color="white" />
              <Resource count={props.definition.quantumCoreCount} icon={AtomIcon} color="white" />
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
  color: string;
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
        {/* <div style={{ fontSize: 45, fontWeight: 'bold' }}>+</div> */}
        <div style={{ fontSize: 60, fontWeight: 'bold' }}>{props.count}</div>
      </div>
      <props.icon style={{ fontSize: 60 }} />
    </div>
  );
};

type BarrierProps = {
  count: number;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

export const Barrier: React.FC<BarrierProps> = (props) => {
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
