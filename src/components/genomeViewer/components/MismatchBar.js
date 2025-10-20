import { Link } from 'react-router-dom';
import { getMismatches } from '../../../assets/javascript/sequenceViewerHelper'
import '../../../assets/styles/genome_viewer.css'

const Gap = ({ widthPercent }) => (
  <div
    style={{
      width: `${widthPercent}%`,
      backgroundColor: 'white',
    }}
  />
);

const MismatchBar = ({ sequence, referenceSequence, alignedStart, alignedEnd, range }) => {
    const mismatches = getMismatches(referenceSequence, sequence.seq);

    return (
        <div className='grey-bar' style={{ width: `${((alignedEnd - alignedStart)/range)*100}%`, position: 'relative' }}>
            {mismatches.map((pos, i) => {
                if (pos < alignedStart || pos > alignedEnd) return null;

                const leftPercent = ((pos - alignedStart) / (alignedEnd - alignedStart)) * 100;

                return (
                <div
                    key={i}
                    style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    width: '1px',
                    height: '100%',
                    backgroundColor: 'red',
                    }}
                    title={`Mismatch at ${pos}`}
                />
                );
            })}
        </div>
    );
};


const MismatchBarRow = ({ sequence, referenceSequence, min, max, range }) => {
  const alignedStart = sequence.seq.search(/[A-Za-z]/);
  const alignedEnd = sequence.seq.length - sequence.seq.split('').reverse().join('').search(/[A-Za-z]/);

  return (
    <div className='row-style' style={{ marginTop: '5px' }}>
      <div className='label-style'>
        <Link className='custom-link' to={`/sequence/${sequence.query}`} style={{ margin: 0 }}>
          {sequence.query}
        </Link>
      </div>

      <div className='line-area-style' style={{ height: '20px', display: 'flex', width: '100%' }}>
        <Gap widthPercent={((alignedStart - min) / range) * 100} />
        <MismatchBar sequence={sequence} referenceSequence={referenceSequence} alignedStart={alignedStart} alignedEnd={alignedEnd} range={range} />
        <Gap widthPercent={((max - alignedEnd) / range) * 100} />
      </div>
    </div>
  );
};

export default MismatchBarRow;
