import React from 'react';
import './LocationCard.css';
import { ReactComponent as LockIcon } from './icons/Lock.svg';
import { ReactComponent as SkullIcon } from './icons/Skull.svg';
import { ReactComponent as WarningIcon } from './icons/Warning.svg';
import { ReactComponent as EnergyIcon } from './icons/Energy.svg';
import { ReactComponent as UpgradeIcon } from './icons/Upgrade.svg';
import { ReactComponent as ResourceIcon } from './icons/Resource.svg';
import { useImage } from './util/hooks/useImage';

type LocationBarrier = 'DOOR' | 'ENEMY' | 'HAZARD';

export type LocationCardDefinition = {
  name: string;
  imageId: string;
  barriers: LocationBarrier[];
  energyCount: number;
  upgradeCount: number;
  resourceCount: number;
};

const BARRIER_COLORS: {
  [key in LocationBarrier]: string;
} = {
  DOOR: '#D4FF6F',
  ENEMY: '#CA84FF',
  HAZARD: '#3EFDD7',
};

const BARRIER_ICONS: {
  [key in LocationBarrier]: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
} = {
  DOOR: LockIcon,
  ENEMY: SkullIcon,
  HAZARD: WarningIcon,
};

type LocationCardProps = {
  definition: LocationCardDefinition;
  style?: React.CSSProperties;
};

export const LocationCard: React.FC<LocationCardProps> = (props) => {
  const image = useImage(`locations/${props.definition.imageId}.png`);

  return (
    <div className="locationCard" style={props.style}>
      <div className="locationCard__safeZone">
        <div
          className="safeZone__content"
          style={
            {
              backgroundImage: image && `url("${image}")`,
            }
          }
        >
          <div className="content__uncovered">
            <div className="content__name">{props.definition.name}</div>

            <div className="content__barriers">
              {props.definition.barriers.map((barrier, i) => {
                const BarrierIcon = BARRIER_ICONS[barrier];
                return <BarrierIcon key={i} style={{ color: BARRIER_COLORS[barrier] }} />;
              })}
            </div>
          </div>

          <div className="content__covered">
            <div className="content__energy">
              {props.definition.energyCount}
              <EnergyIcon />
            </div>

            <div className="content__rewards">
              {[...new Array(props.definition.upgradeCount)].map((_, i) => (
                <UpgradeIcon key={i} style={{ color: '#3E8EFD' }} />
              ))}
              {[...new Array(props.definition.resourceCount)].map((_, i) => (
                <ResourceIcon key={i} style={{ color: '#CFCFCF' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
