import React from 'react';
import './ResourceCard.css';
import { useImage } from './util/hooks/useImage';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import DirtImage from './images/dirt.png';

export type ResourceCardDefinition = {
  id: string;
  name: string;
  description: string;
};

type ResourceCardProps = {
  definition: ResourceCardDefinition;
  style?: React.CSSProperties;
};

export const ResourceCard: React.FC<ResourceCardProps> = (props) => {
  const elementId = `R${props.definition.id}`;
  const image = useImage(`resources/${props.definition.id}.png`);

  return (
    <div
      id={elementId}
      className="resourceCard"
      style={props.style}
      onClick={() => {
        toPng(document.getElementById(elementId)!, {
          pixelRatio: 1,
        }).then((dataUrl) => download(dataUrl, `${elementId}[face,1].png`));
      }}
    >
      <div className="resourceCard__content">
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
