import React from "react";
import "./LocationCard.css";
import { ReactComponent as LockIcon } from "./icons/Lock.svg";
import { ReactComponent as SkullIcon } from "./icons/Skull.svg";
import { ReactComponent as WarningIcon } from "./icons/Warning.svg";
import { ReactComponent as EnergyIcon } from "./icons/Energy.svg";
import { ReactComponent as UpgradeIcon } from "./icons/Upgrade.svg";
import { ReactComponent as ResourceIcon } from "./icons/Resource.svg";
import { useImage } from "./util/hooks/useImage";
import { toPng } from "html-to-image";
import download from "downloadjs";

type LocationBarrier = "D" | "E" | "H";

export type LocationCardDefinition = {
  id: string;
  name: string;
  barriers: LocationBarrier[];
  energyCount: number;
  upgradeCount: number;
  resourceCount: number;
};

const BARRIER_COLORS: {
  [key in LocationBarrier]: string;
} = {
  D: "#3EFDD7",
  E: "#CA84FF",
  H: "#f1ff6f",
};

const BARRIER_ICONS: {
  [key in LocationBarrier]: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
} = {
  D: LockIcon,
  E: SkullIcon,
  H: WarningIcon,
};

type LocationCardProps = {
  definition: LocationCardDefinition;
  style?: React.CSSProperties;
};

export const LocationCard: React.FC<LocationCardProps> = (props) => {
  const elementId = `L${props.definition.id}`;
  const image = useImage(`locations/${props.definition.id}.png`);

  return (
    <div
      id={elementId}
      className="locationCard"
      style={props.style}
      onClick={() => {
        toPng(document.getElementById(elementId)!, {
          pixelRatio: 1,
        }).then((dataUrl) => download(dataUrl, `${elementId}[face,1].png`));
      }}
    >
      <div className="locationCard__trimZone">
        <div className="locationCard__safeZone">
          <div
            className="safeZone__content"
            style={{
              backgroundImage: image && `url("${image}")`,
            }}
          >
            <div className="content__name">{props.definition.name}</div>

            <div className="content__barriers">
              <div className="barriers__bar">
                {props.definition.barriers.map((barrier, i) => {
                  const BarrierIcon = BARRIER_ICONS[barrier];
                  return (
                    <BarrierIcon
                      key={i}
                      style={{ color: BARRIER_COLORS[barrier] }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="content__rewards">
              <div className="rewards__energy">
                {props.definition.energyCount !== 0 && (
                  <>
                    <div className="energy__count">
                      {props.definition.energyCount}
                    </div>
                    <EnergyIcon />
                  </>
                )}
              </div>

              <div className="rewards__cards">
                {[...new Array(props.definition.upgradeCount)].map((_, i) => (
                  <UpgradeIcon key={i} style={{ color: "#4B96FF" }} />
                ))}
                {[...new Array(props.definition.resourceCount)].map((_, i) => (
                  <ResourceIcon key={i} style={{ color: "#e7e7e7" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
