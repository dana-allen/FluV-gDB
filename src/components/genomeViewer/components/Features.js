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
const clamp = (v) => Math.max(0, Math.min(100, v));
export const FeatureBtnMultiple = ({ i, feature, min, range, onClick }) => {
  // compute overall bounds of the feature
  const minStart = Math.min(...feature.regions.map(r => r.start));
  const maxEnd = Math.max(...feature.regions.map(r => r.end));

    const overallLeft = clamp(((minStart - min) / range) * 100);
  const overallWidth = clamp(((maxEnd - minStart) / range) * 100);


  return (
    <OverlayTrigger
      key={i}
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${i}`}>
          {feature.name} {feature.regions.map(r => `(${r.start}-${r.end})`).join(', ')}
        </Tooltip>
      }
    >
      <div className="features-btn-container" style={{ position: "absolute", left: `${overallLeft}%`, width: `${overallWidth}%`, top: `${feature.row * 35}px`, height: "30px", cursor: "pointer" }}
        onClick={() => onClick(feature)}>

        {/* Individual region blocks */}
        {feature.regions.map((region, idx) => {
          const relLeftPercent = clamp(((region.start - minStart) / (maxEnd - minStart || 1)) * 100);
          const relWidthPercent = clamp(((region.end - region.start) / (maxEnd - minStart || 1)) * 100);

          return (
            <div
              key={idx}
              className="features-btn"
              style={{
                left: `${relLeftPercent}%`,
                width: `${relWidthPercent}%`,
                top: `${feature.row * 5}px`,
                height: "30px",
                position: "absolute"
              }}
            >
              {feature.name}
            </div>
          );
        })}

        {/* Connector lines between regions */}
        {feature.regions.length > 1 &&
          feature.regions.slice(0, -1).map((region, idx) => {
            const next = feature.regions[idx + 1];
            const relLeft = clamp(((region.end - minStart) / (maxEnd - minStart || 1)) * 100);
            const relWidth = clamp(((next.start - region.end) / (maxEnd - minStart || 1)) * 100);


            return (
              <div
                key={`line-${idx}`}
                style={{
                  position: "absolute",
                  left: `${relLeft}%`,
                  width: `${relWidth}%`,
                  top: `${feature.row * 5 +5}px`,
                  borderTop: "1px dashed var(--feature-color, #008cba)"
                }}
              />
            );
          })}

      </div>
    </OverlayTrigger>
  );
};
function groupFeatures(features) {
  const grouped = {};

  features.forEach(f => {
    if (!grouped[f.name]) grouped[f.name] = { name: f.name, regions: [] };

    grouped[f.name].regions.push({
      start: f.start,
      end: f.end
    });
  });

  // Convert object → array
  return Object.values(grouped);
}
export const Features = ({ features, min, range, setSelectedFeature }) => {

  var features2 = groupFeatures(features);

    // Assign rows to regions to avoid overlap
  const assignRows = (features) => {
    const rows = []; // each row is an array of regions already placed

    features.forEach((feature) => {
      if (feature.name != 'full'){ 
      let rowIndex = 0;

      for (; rowIndex <= rows.length; rowIndex++) {
        // ensure the row exists
        if (!rows[rowIndex]) rows[rowIndex] = [];

        // check if any of feature's regions overlap with regions in this row
        const overlap = feature.regions.some((region) =>
          rows[rowIndex].some(
            (r) => !(region.end < r.start || region.start > r.end) // overlap check
          )
        );

        if (!overlap) break; // found a row where this feature fits
      }

      // assign row to feature
      feature.row = rowIndex;

      // add all regions to that row
      feature.regions.forEach((region) => {
        rows[rowIndex].push(region);
      });
      }
    });
    return features;
  };

  features2 = assignRows(features2)

  console.log(features2)
  const maxRow = Math.max(...features2.map(f => f.row || 0));
  const ROW_HEIGHT = 30;
  const ROW_GAP = 4;
  const totalHeight = (maxRow + 1) * (ROW_HEIGHT + ROW_GAP);

  return (
    <div className='row-style'>
      {/* <div className='label-style'></div> */}
      {/* <div className='line-area-style features'> */}
      <div className='line-area-style features'
      style={{
          // position: 'relative',
          height: `${totalHeight}px`,   // <-- ensures space is reserved!
        }}
        >
      {/* <div> */}
        {features2.map((feature, i) => {
          if (feature.name === 'full') return null; 
          console.log(feature.regions)
          if (feature.regions.length > 1)
            return (
                
              <FeatureBtnMultiple
                key={i}
                i={i}
                feature={feature}
                min={min}
                range={range}
                onClick={() => setSelectedFeature(feature)}
              />
              
            );
            else return (
               <FeatureBtnMultiple
                key={i}
                i={i}
                feature={feature}
                min={min}
                range={range}
                onClick={() => setSelectedFeature(feature)}
              />

            )
        })}
      </div>
    </div>
  );
};
