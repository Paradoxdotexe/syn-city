import React, { ReactNode } from 'react';
import './LocationCard.css';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { ReactComponent as ChipIcon } from './icons/Chip.svg';
import { ReactComponent as BatteryIcon } from './icons/Battery.svg';
import { ReactComponent as DataIcon } from './icons/Data.svg';
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
    batteryCount: number;
    circuitCount: number;
    dataCount: number;
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
              {[...new Array(props.definition.barriers.enemyCount)].map((_, i) => (
                <SkullIcon key={i} style={{ fontSize: 70 }} />
              ))}
              {[...new Array(props.definition.barriers.lockCount)].map((_, i) => (
                <LockIcon key={i} style={{ fontSize: 70 }} />
              ))}
              {[...new Array(props.definition.barriers.hazardCount)].map((_, i) => (
                <WarningIcon key={i} style={{ fontSize: 70 }} />
              ))}
            </div>
          </div>
        </div>
        <div className="content__info">
          <div className="info__safeZone">
            <div className="info__name">{props.definition.name}</div>
            <div className="info__resources">
              <Resource
                count={props.definition.resources.circuitCount}
                logo={ChipIcon}
                color="FF6E70"
              />
              <Resource
                count={props.definition.resources.dataCount}
                logo={DataIcon}
                color="6F98FF"
              />
              <Resource
                count={props.definition.resources.batteryCount}
                logo={BatteryIcon}
                color="FFFF6F"
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
  logo: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: -5 }}>
        <div style={{ fontSize: 45, fontWeight: 'bold' }}>+</div>
        <div style={{ fontSize: 60, fontWeight: 'bold' }}>{props.count}</div>
      </div>
      <props.logo style={{ fontSize: 60, color: props.color }} />
    </div>
  );
};
