import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Styling
import '../../../assets/styles/reference.css'

import { useApiEndpoint } from '../../../hooks';
import GenomeRegionAnnotationsTable from "./GenomeRegionAnnotationsTable";
import GenomeViewer from '../../../components/genomeViewer/GenomeViewer'
import PagingButtons from '../../../components/buttons/PagingButtons';
import { useLoadingWheelHandler, useErrorHandler } from '../../../contexts';

const Reference = () => {

    const { id } = useParams();

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')

    const handlePageChange = (items) => {
        const t = buildGenomeViewerResults(items[0])
        setNextAlign(t)
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    const url = `/api/sequence/reference/${id}`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const buildGenomeViewerResults = (data) => {

        var features = []
        for(let i=0; i< endpointData["ref_features"].length; i++){
            features.push({name: endpointData["ref_features"][i]["product"], 
                start: endpointData["ref_features"][i]["cds_start"],
                end: endpointData["ref_features"][i]["cds_end"]
        })
    }

        var alignedSeq = []
        for(let i=0; i< data.length; i++){
            alignedSeq.push({query:data[i]["sequence_id"], 
                            seq:data[i]["alignment"],
                            features:data[i]["features"]}
                            )
        }

            
        const results = {primary_accession: id,
                        seq: endpointData["ref_sequence"],
                        alignedSeq: alignedSeq,
                        features: features}
            
        
                        console.log(results)

        return [results]

    }

    const [nextAlign, setNextAlign] = useState()
    useEffect(() => {
        triggerLoadingWheel(isPending)
        if(endpointError) triggerError(endpointError);

    }, [endpointError, endpointData, isPending]);

    return (
        
        <div className='container'>
        <div className='row'>
            <h2> Sequence {id}</h2>
            <p>
                Underlying sequence:&nbsp;
                <Link className='gdb-link' to={`/sequence/${id}`}>{id}</Link>
                <br></br>
            </p>
            <div className='row'>
                <h4 className="title-sub">Genome region annotations</h4>
                {endpointData["ref_features"] && <GenomeRegionAnnotationsTable genome={endpointData["ref_features"]} />}
            </div>
            
            {endpointData["aligned_sequences"] && 
                <div>
                    <h4 className="title-sub">Aligned Sequences</h4> 
                    <br></br>
                    <br></br>

                    <div>
                        <div><PagingButtons data={endpointData["aligned_sequences"]} onPageChange={handlePageChange}> </PagingButtons></div>
                        <a>Aligned Sequences {startRecord} to {endRecord} of {endpointData["aligned_sequences"].length}</a>
                        {nextAlign && <GenomeViewer data={nextAlign}/>}

                    </div>
                </div>
            }

        </div> 
        <br></br>
    </div>
       
    );
};
 
export default Reference;

