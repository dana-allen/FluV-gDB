import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from 'react-bootstrap';

// Custom Components
import SampleDetails from './SampleDetails';
import SequenceDetails  from './SequenceDetails';
import InsertionDetails from './InsertionDetails';
import PubMedRefDetails from './PubMedRefDetails'

import GenomeViewer3 from 'components/genomeViewer/GenomeViewer3'
import GenomeViewer from 'components/genomeViewer/GenomeViewer'
import SequenceViewer from 'components/genomeViewer/SequenceViewer';

// Helpers
import { downloadPng } from "utils/downloadHelper";

// Hooks and Contexts
import { useDownload, useSequence } from 'hooks';
import { useLoadingWheelHandler, useErrorHandler  } from "contexts"

// Importing stylesheets
import 'assets/styles/sequence.css';


const Sequence = () => {

    const { id } = useParams();
    const viewerRef = useRef(null);
    const { downloadFile } = useDownload();
    
    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    // Hooks
    const { meta_data, 
            sequence,
            alignment,  
            insertions,
            formatted_regions,
            genomeViewerData, 
            loading, error } = useSequence(id);

    triggerLoadingWheel(loading);
    triggerError(error);

    const pubmedId = meta_data?.pubmed_id;
    // const insertions = alignment?.insertions;

    console.log(genomeViewerData)

    const [featureData, setFeatureData] = useState(null)

    return (
        <div className='container'>

            <div className="row col-md-6">
                <h2> Sequence {id} </h2>
            </div>

            { meta_data && 
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <SequenceDetails meta_data={meta_data} 
                                            alignment={alignment ? alignment : null} />

                            {/* <div>
                                    <h4 className='title-sub'>Sequence</h4>
                                </div>  */}
                                <div style={{'text-align':'right'}}>
                                    <Button size='sm' 
                                            className='btn-main-filled' 
                                            onClick={() => downloadFile('>'+id+'\n'+sequence.toUpperCase(), id+".fasta", "fasta")}>
                                        Download Sequence
                                    </Button>
                                </div> 
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div>
                                    <SampleDetails meta_data={meta_data} regions={formatted_regions} />
                                </div> 
                                
                                <br></br>
                                <br></br>
                                <div>
                                    <h4 className='title-sub'>Phylogenetic Tree</h4>
                                    </div> 
                                    <div>
                                    <p>View the <Link className='gdb-link'>interactive phylogeneic tree.</Link></p>
                                </div> 
                                
                            </div> 
                        <div>
                            
                        </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className='row'>
                        

                    </div>
                    <br></br>
                    {/* <hr></hr> */}

                    { meta_data.exclusion_status === 0 && alignment &&
                        <div className="row">
                            <div className="col-md-6">
                                <h4 className='title-sub'>Alignment</h4>
                            </div>
                            <div className="col-md-6 text-end">
                                <Button size='sm' className='btn-main-filled' onClick={() => downloadFile('>'+id+'\n'+alignment["alignment"], id+"_aligned.fasta", "fasta")}>
                                Download Alignment
                                </Button>
                                <Button size='sm' className='btn-main-filled ms-2' onClick={() => downloadPng(viewerRef, alignment.alignment_name)}>
                                Download PNG
                                </Button>
                            </div>
                            
                            {alignment && 
                                <div ref={viewerRef}>
                                    <GenomeViewer3 data={alignment}
                                                    setFeatureData={setFeatureData}/>
                                    {/* <GenomeViewer2 data={[genomeViewerData]} 
                                                    refId={genomeViewerData.primary_accession} 
                                                    setFeatureData={setFeatureData}/> */}
                                </div> 
                            }
                            {/* {featureData && 
                
                                <SequenceViewer start={featureData.start} 
                                                        end={featureData.end} 
                                                        refSequence={featureData.refSequence} 
                                                        currentSequences={featureData.currentSequences} 
                                                        nucPositions={featureData.nucPositions} />
                                } */}
                        </div>
                    }
                    <br></br>

     

                    { insertions &&
                        <InsertionDetails insertions={insertions} />
                    }

                    { pubmedId && 
                        <PubMedRefDetails pubmedId={pubmedId} />
                    }
                </div>
            }

            <br></br>

        </div>
    );
};
 
export default Sequence;
