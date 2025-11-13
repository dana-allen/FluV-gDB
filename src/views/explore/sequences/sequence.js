import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

// Custom Components
import SampleDetails from './SampleDetails';
import SequenceDetails  from './SequenceDetails';
import GenomeViewer from '../../../components/genomeViewer/GenomeViewer'

// Helpers
import { downloadPng } from "../../../utils/downloadHelper";

// Hooks and Contexts
import { useDownload, useSequence } from '../../../hooks';
import { useLoadingWheelHandler, useErrorHandler  } from "../../../contexts"

// Importing stylesheets
import '../../../assets/styles/sequence.css'

const Sequence = () => {

    const { id } = useParams();
    const viewerRef = useRef(null);
    const { downloadFile } = useDownload();
    
    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    // Hooks
    const { meta_data, alignment, sequence, genomeViewerData, regions, loading, error } = useSequence(id);
    triggerLoadingWheel(loading);
    triggerError(error);

    const pubmedId = meta_data?.pubmed_id;
    const insertions = alignment?.insertions;

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
                        </div>
                        <div className="col-md-6">
                            <SampleDetails meta_data={meta_data} regions={regions} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-6">
                            <h4 className='title-sub'>Sequence</h4>
                        </div> 
                        <div>
                            <Button size='sm' 
                                    className='btn-main-filled' 
                                    onClick={() => downloadFile('>'+id+'\n'+sequence.toUpperCase(), id+".fasta", "fasta")}>
                                Download Sequence
                            </Button>
                        </div>

                    </div>
                    <br></br>

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
                                    {genomeViewerData && <GenomeViewer data={genomeViewerData} refId={alignment.alignment_name}/>}
                                </div> 
                            }
                        </div>
                    }
                    <br></br>

                    { insertions &&
                        <div className='row'>
                            <div className="col-md-6">
                                <h4 className='title-sub'>Insertions</h4>
                            </div>
                            <div>
                                {insertions.map((insertion, i) => (
                                    <p>{insertion.insertion}</p>
                                ))}
                            </div>
                        </div>
                    }

                    { pubmedId && 
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className='title-sub'>Reference</h4>
                                </div> 
                            </div> 
                            <div className="row">
                                <div className="col-md-6">
                                    <div>
                                        <Link className='custom-link reference' to={`https://www.ncbi.nlm.nih.gov/pubmed/${pubmedId}`} target="_blank"> <FontAwesomeIcon icon={faLink} /> PubMed {pubmedId} </Link>
                                    </div>
                                </div>  
                            </div> 
                        </div>
                    }
                </div>
            }

            <br></br>

        </div>
    );
};
 
export default Sequence;
