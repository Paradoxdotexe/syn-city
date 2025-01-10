import React from 'react';
import './RewardCard.css';
import { useImage } from './util/hooks/useImage';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import DirtImage from './images/dirt.png';

export type RewardCardDefinition = {
  id: string;
  name: string;
  description: string;
  quantity: number;
};

type RewardCardProps = {
  definition: RewardCardDefinition;
  style?: React.CSSProperties;
};

export const RewardCard: React.FC<RewardCardProps> = (props) => {
  const elementId = `R${props.definition.id}`;
  const image = useImage(`rewards/${props.definition.id}.png`);

  return (
    <div
      id={elementId}
      className="rewardCard"
      style={props.style}
      onClick={() => {
        toPng(document.getElementById(elementId)!, {
          pixelRatio: 1,
        }).then((dataUrl) =>
          download(dataUrl, `${elementId}[face,${props.definition.quantity}].png`)
        );
      }}
    >
      <div className="rewardCard__content">
        <div
          className="content__image"
          style={{
            backgroundImage: image && `url("${image}")`,
          }}
        />
        <div
          className="content__info"
          style={{
            background: `url("${DirtImage}")`,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
          }}
        >
          <div className="info__safeZone">
            <div className="info__name">{props.definition.name}</div>
            <div className="info__description">{props.definition.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
