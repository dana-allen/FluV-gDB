import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Features } from './components/Features';
import { NumberLine } from './components/NumberLine';
import SequenceViewer from './SequenceViewer';
import MismatchBarRow from './components/MismatchBar';
import { getMismatches } from '../../assets/javascript/sequenceViewerHelper'
import '../../assets/styles/genome_viewer.css'

const GenomeViewer2 = ({ data, refId=null, setFeatureData }) => {

    const [selectedFeature, setSelectedFeature] = useState(null);

    const alignedSequences = [...(data[0]?.alignedSeq || [])]
    const features = [...(data[0]?.features || [])];
    const referenceSequence = data[0]?.seq

    // const features = [{'name':'M1', 'start':1, 'end':25}, {'name':'M1', 'start':60, 'end':80}]
    
    features.push({'name':'full', 'start':1, 'end':data[0]?.seq.length || 0})
    const positions = Array.from(new Set([].concat(...features.map(f => [f.start, f.end])))).sort((a, b) => a - b);

    const min = positions[0];
    const max = positions[positions.length - 1];
    // const max=100;
    const range = max - min;


    let mismatches = []
    for (let i = 0; i < alignedSequences.length; i++) {
        const newMismatches = getMismatches(referenceSequence, alignedSequences[i].seq);
        mismatches.push(...newMismatches);
    }
    mismatches = [...new Set(mismatches)];

    console.log(data[0])

    const onFeatureClick = (feature) => {
        const data = {
                        start: feature.start,
                        end: feature.end,
                        refSequence: referenceSequence,
                        currentSequences: alignedSequences,
                        nucPositions: mismatches
                    }
                    setFeatureData(data)
    }
    return (
        <div className='genome-container'>
            {refId && 
                <p>
                    Reference:&nbsp;
                    <Link className="custom-link" to={`/reference/${refId}`}><b>{refId}</b></Link>
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


            {alignedSequences.map((sequence) => (
                <MismatchBarRow
                    key={sequence.query}
                    sequence={sequence}
                    referenceSequence={referenceSequence}
                    min={min}
                    max={max}
                    range={range}
                />
            ))}


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

export default GenomeViewer2;