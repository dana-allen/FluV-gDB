import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import '../../../assets/styles/genome_viewer.css'

export const FeatureBtn = ({i, feature, min, range, onClick}) => {
    const leftPercent = ((feature.start - min) / range) * 100;
    const widthPercent = ((feature.end - feature.start) / range) * 100;

    return (
      <OverlayTrigger
          key={i}
          placement="top"
          overlay={
            <Tooltip id={`tooltip-${i}`}>
            {feature.name} ({feature.start}-{feature.end})
            </Tooltip>
          }
          >
          <button 
            className='features-btn'
            style={{
              left: `${leftPercent}%`,
              width: `${widthPercent}%`,
            }}
            onClick={() => onClick(feature)}
          >
            {feature.name}
          </button>
      </OverlayTrigger>
    );
}

export const Features = ({ features, min, range, setSelectedFeature }) => {
  return (
    <div className='row-style'>
      <div className='label-style'></div>
      <div className='line-area-style features'>
        {features.map((feature, i) => {
          if (feature.name === 'full') return null; 
          return (
            <FeatureBtn
              key={i}
              i={i}
              feature={feature}
              min={min}
              range={range}
              onClick={() => setSelectedFeature(feature)}
            />
          );
        })}
      </div>
    </div>
  );
};
