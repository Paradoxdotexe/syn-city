import React, { ReactNode } from 'react';
import './LocationCard.css';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { ReactComponent as ChipIcon } from './icons/Chip.svg';
import { ReactComponent as BatteryIcon } from './icons/Battery.svg';
import { ReactComponent as DataIcon } from './icons/Data.svg';
import { ReactComponent as GearIcon } from './icons/Gear.svg';
import { ReactComponent as LockIcon } from './icons/Lock.svg';
import { ReactComponent as SkullIcon } from './icons/Skull.svg';
import { ReactComponent as WarningIcon } from './icons/Warning.svg';

export type LocationCardDefinition = {
  id: string;
  name: string;
  barriers: {
    enemyCount: number;
    lockCount: number;
    hazardCount: number;
  };
  resources: {
    circuitCount: number;
    dataCount: number;
    batteryCount: number;
    gearCount: number;
  };
  quantity: number;
};

type LocationCardProps = {
  definition: LocationCardDefinition;
  style?: React.CSSProperties;
};

export const LocationCard: React.FC<LocationCardProps> = (props) => {
  const elementId = `R${props.definition.id}`;

  return (
    <div
      id={elementId}
      className="locationCard"
      style={props.style}
      onClick={() => {
        toPng(document.getElementById(elementId)!, {
          pixelRatio: 1,
        }).then((dataUrl) =>
          download(dataUrl, `${elementId}[face,${props.definition.quantity}].png`)
        );
      }}
    >
      <div className="locationCard__content">
        <div className="content__top">
          <div className="top__safeZone">
            <div className="top__barriers">
              <Barrier count={props.definition.barriers.enemyCount} icon={SkullIcon} />
              <Barrier count={props.definition.barriers.lockCount} icon={LockIcon} />
              <Barrier count={props.definition.barriers.hazardCount} icon={WarningIcon} />
            </div>
          </div>
        </div>
        <div className="content__info">
          <div className="info__safeZone">
            <div className="info__name">{props.definition.name}</div>
            <div className="info__resources">
              {[...new Array(props.definition.resources.circuitCount)].map((_, i) => (
                <ChipIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.resources.dataCount)].map((_, i) => (
                <DataIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.resources.batteryCount)].map((_, i) => (
                <BatteryIcon key={i} style={{ fontSize: 60 }} />
              ))}
              {[...new Array(props.definition.resources.gearCount)].map((_, i) => (
                <GearIcon key={i} style={{ fontSize: 60 }} />
              ))}

              {/* <Resource
                count={props.definition.resources.circuitCount}
                icon={ChipIcon}
                color="FF6E70"
              />
              <Resource
                count={props.definition.resources.dataCount}
                icon={DataIcon}
                color="6F98FF"
              />
              <Resource
                count={props.definition.resources.batteryCount}
                icon={BatteryIcon}
                color="FFFF6F"
              />
              <Resource
                count={props.definition.resources.gearCount}
                icon={GearIcon}
                color="6FFF95"
              /> */}
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
        <div style={{ fontSize: 45, fontWeight: 'bold' }}>+</div>
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
