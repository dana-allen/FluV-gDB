import { aaColors, nucColors } from '../../../assets/javascript/sequenceViewerHelper';

import '../../../assets/styles/genome_viewer.css'

export const GroupedSequenceBlock = ({ data, type }) => (
  <div className='blocks'>
    {data.map((value, i) => (
      <SequenceBlock key={i} value={value} type={type} />
    ))}
  </div>
);

export const SequenceBlock = ({ value, type }) => (
  <div className='block'
    style={{
      backgroundColor:
        type === 'num'
          ? 'transparent'
          : type === 'aa'
          ? aaColors[value]
          : type === 'nuc'
          ? nucColors[value]
          : 'lightgrey',
      }}
  >
    {type !== 'num' ? <b>{value}</b> : value}
  </div>
);
