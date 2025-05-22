import React from "react";
import "./LocationCard.css";
import { ReactComponent as LockIcon } from "./icons/Lock.svg";
import { ReactComponent as SkullIcon } from "./icons/Skull.svg";
import { ReactComponent as WarningIcon } from "./icons/Warning.svg";
import { ReactComponent as EnergyBannerIcon } from "./icons/EnergyBanner.svg";
import { ReactComponent as UpgradeIcon } from "./icons/Upgrade.svg";
import { ReactComponent as ResourceIcon } from "./icons/Resource.svg";
import { useImage } from "../util/hooks/useImage";
import { toPng } from "html-to-image";
import download from "downloadjs";

export type LocationCardDefinition = {
  id: string;
  name: string;
  enemyCount: number;
  lockCount: number;
  hazardCount: number;
  energyCount: number;
  upgradeCount: number;
  resourceCount: number;
  ability?: string;
};

const BARRIER_META = {
  enemy: {
    icon: SkullIcon,
    color: "#CA84FF",
  },
  lock: {
    icon: LockIcon,
    color: "#3EFDD7",
  },
  hazard: {
    icon: WarningIcon,
    color: "#f1ff6f",
  },
};

const LOCATION_COLOR: { [key: string]: string } = {
  E: "#f5ff38",
  U: "#38d1ff",
  R: "#dbdbdb",
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
            <div className="content__rewards">
              {(!!props.definition.energyCount ||
                !!props.definition.upgradeCount ||
                !!props.definition.resourceCount) && (
                <div className="rewards__energy">
                  <div className="energy__count">
                    {props.definition.energyCount}
                  </div>
                  <EnergyBannerIcon
                    style={{
                      color: LOCATION_COLOR[props.definition.id[0]],
                    }}
                  />
                </div>
              )}

              <div className="rewards__cards">
                {[...new Array(props.definition.upgradeCount)].map((_, i) => (
                  <UpgradeIcon key={i} />
                ))}
                {[...new Array(props.definition.resourceCount)].map((_, i) => (
                  <ResourceIcon key={i} />
                ))}
              </div>

              <div className="rewards__ability">{props.definition.ability}</div>
            </div>

            {props.definition.name !== "Wasteland" && (
              <div className="content__barriers">
                {Object.entries(BARRIER_META).map(
                  ([key, { icon: Icon, color }]) => {
                    const count = (props.definition as any)[`${key}Count`];
                    return (
                      !!count && (
                        <div className="barriers__barrier">
                          <div className="barrier__count">{count}</div>
                          <Icon key={key} style={{ color }} />
                        </div>
                      )
                    );
                  }
                )}
              </div>
            )}

            <div className="content__name">{props.definition.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
