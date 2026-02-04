import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Features } from './components/Features';
import { NumberLine } from './components/NumberLine';
import SequenceViewer from './SequenceViewer';
import MismatchBarRow from './components/MismatchBar';
import { getMismatches } from '../../assets/javascript/sequenceViewerHelper'
import '../../assets/styles/genome_viewer.css'

const GenomeViewer3 = ({ data, setFeatureData }) => {

    console.log(data)


    const [selectedFeature, setSelectedFeature] = useState(null);


    const reference_accession = data ? data["reference_accession"] : null
    const query_alignment_sequence = data ? data["query_alignment_sequence"] : null
    const reference_alignment_sequence = data ? data["reference_alignment_sequence"] : null
    const features = data ? data["features"] : null
    const min = 1;
    const max = reference_alignment_sequence.length;
    const range = max - min;
    
    console.log("range ", range, "max ", max)

    const alignedSequences = [...(data[0]?.alignedSeq || [])]
    // const features = [...(data[0]?.features || [])];

    
    // features.push({'name':'full', 'start':1, 'end':data[0]?.seq.length || 0})
    const positions = Array.from(new Set([].concat(...features.map(f => [f.cds_start, f.cds_end])))).sort((a, b) => a - b);

    const mismatches = getMismatches(reference_alignment_sequence, query_alignment_sequence);

    // let mismatches = []
    // for (let i = 0; i < query_alignment_sequence.length; i++) {
        
    //     mismatches.push(...newMismatches);
    // }
    // mismatches = [...new Set(mismatches)];

    // console.log(data[0])

    const onFeatureClick = (feature) => {
        const data = {
                        start: feature.start,
                        end: feature.end,
                        refSequence: reference_alignment_sequence,
                        currentSequences: alignedSequences,
                        nucPositions: mismatches
                    }
                    setFeatureData(data)
    }
    return (
        <div className='genome-container'>
            {reference_accession && 
                <p>
                    Reference:&nbsp;
                    <Link className="custom-link" to={`/reference/${reference_accession}`}><b>{reference_accession}</b></Link>
                </p>
            }
            
            <NumberLine positions={positions} min={min} range={range}/>

            <Features
                features={features}
                min={min}
                range={range}
                selectedFeature={selectedFeature}
                // setSelectedFeature={setSelectedFeature}
                setSelectedFeature={onFeatureClick}
            />

            <MismatchBarRow
                // key={primary_a}
                sequence={query_alignment_sequence}
                reference_sequence={reference_alignment_sequence}
                min={min}
                max={max}
                range={range}
            />


            {/* {alignedSequences.map((sequence) => (
                
            ))} */}


            {/* {selectedFeature && (
                <div className='selected-feature'>
                    <h5 className='selected-feature-label'>{selectedFeature.name} ({selectedFeature.start} - {selectedFeature.end})</h5>
                    <SequenceViewer start={selectedFeature.start} 
                                        end={selectedFeature.end} 
                                        refSequence={referenceSequence} 
                                        currentSequences={alignedSequences} 
                                        nucPositions={alignedSequences.length > 0 && mismatches} />
                </div>
            )} */}
        </div>
    );



}

export default GenomeViewer3;