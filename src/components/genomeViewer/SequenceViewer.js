import { useState, useEffect } from 'react';

import { getSequenceData } from '../../assets/javascript/sequenceViewerHelper';
import Switches from './components/Switches';
import LabelBlock from './components/labels';
import { GroupedSequenceBlock, SequenceBlock } from './components/blocks';

import '../../assets/styles/genome_viewer.css'

const SequenceViewer = ({ start, end, refSequence, currentSequences, nucPositions }) => {

  const [sequenceData, setSequenceData] = useState({
    fullResults: [],
    nucleotideResults: [],
    aminoAcidResults: []
  });
  const [showProtein, setShowProtein] = useState(true);
  const [showNucleotide, setShowNucleotide] = useState(true);

  useEffect(() => {
    if (nucPositions && nucPositions.length > 0) {
      const nucPositionsRegion = nucPositions
        .filter(pos => pos >= start && pos <= end)
        .sort((a, b) => a - b); // numerical ascending

        console.log(nucPositionsRegion)

      const results = getSequenceData( start,
                                        end,
                                        refSequence,
                                        currentSequences,
                                        nucPositionsRegion
                                      );

      setSequenceData(results);
    }
  }, [start, end, nucPositions]);

  const { fullResults, nucleotideResults, aminoAcidResults } = sequenceData;


  // Define render functions for each mode
  const renderModes = {
    nucleotide: (result) => (
      <>
        <div className="sequence_block_individual sm-gap">
          <GroupedSequenceBlock data={[result.ref.nuc]} type="nuc" />
        </div>
        <hr />
        {result.seq.map((seq, i) => (
          <GroupedSequenceBlock key={i} data={[seq.nuc]} type="nuc" />
        ))}
        <GroupedSequenceBlock data={[result.nuc_index]} type="num" />
      </>
    ),

    protein: (result) => (
      <>
        <div className="sequence_block_individual lg-width">
          <SequenceBlock value={result.codon_index} type="num" />
          <GroupedSequenceBlock data={[result.ref.aa]} type="aa" />
        </div>
        <hr />
        {result.seq.map((seq, i) => (
          <GroupedSequenceBlock key={i} data={[seq.aa]} type="aa" />
        ))}
      </>
    ),

    both: (result) => (
      <>
        <div className="sequence_block_individual lg-width">
          <SequenceBlock value={result.codon_index} type="num" />
          <SequenceBlock value={result.ref.aa} type="aa" />
          <GroupedSequenceBlock data={result.ref.nuc} type="nuc" />
        </div>
        <hr />
        {result.seq.map((seq, i) => (
          <div key={i}>
            <SequenceBlock value={seq.aa} type="aa" />
            <GroupedSequenceBlock data={seq.nuc} type="nuc" />
          </div>
        ))}
        <GroupedSequenceBlock data={result.nuc_index} type="num" />
      </>
    ),
  };

  // Determine mode based on switches
  let mode, blockToRender;
  if (showNucleotide && showProtein) {
    mode = 'both';
    blockToRender = fullResults;
  } else if (showNucleotide) {
    mode = 'nucleotide';
    blockToRender = nucleotideResults;
  } else if (showProtein) {
    mode = 'protein';
    blockToRender = aminoAcidResults;
  } else {
    blockToRender = [];
  }
  console.log(nucPositions)
  return (
    <div>
      {nucPositions.length > 0 &&
        <div className='main-viewer'>

          <Switches
            switches={[
              { label: "amino acids", checked: showProtein, onChange: setShowProtein },
              { label: "nucleotides", checked: showNucleotide, onChange: setShowNucleotide },
            ]}
          />

          <div className='sequence_viewer'>

            <LabelBlock showProtein={showProtein} showNucleotide={showNucleotide} alignmentResults={currentSequences} /> 

            <div className={`sequence_block ${showProtein ? 'with-gap' : ''}`}>
              {blockToRender.map((result, idx) => (
                <div key={idx}>
                  {renderModes[mode](result)}
                </div>
              ))}
            </div>

          </div>

        </div>
      }
    </div>
  );
};

export default SequenceViewer;
