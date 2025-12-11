import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

// Custom Components
import SampleDetails from './SampleDetails';
import SequenceDetails  from './SequenceDetails';
import GenomeViewer2 from '../../../components/genomeViewer/GenomeViewer2'
import GenomeViewer from '../../../components/genomeViewer/GenomeViewer'
import SequenceViewer from '../../../components/genomeViewer/SequenceViewer';
import { nucColors } from '../../../assets/javascript/sequenceViewerHelper';
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
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div>
                                    <SampleDetails meta_data={meta_data} regions={regions} />
                                </div> 
                                <div>
                                    <h4 className='title-sub'>Sequence</h4>
                                </div> 
                                <div>
                                    <Button size='sm' 
                                            className='btn-main-filled' 
                                            onClick={() => downloadFile('>'+id+'\n'+sequence.toUpperCase(), id+".fasta", "fasta")}>
                                        Download Sequence
                                    </Button>
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
                                    {/* {genomeViewerData && <GenomeViewer data={genomeViewerData} refId={alignment.alignment_name}/>} */}
                                    <GenomeViewer2 data={[genomeViewerData]} refId={genomeViewerData.primary_accession} setFeatureData={setFeatureData}/>
                                    {/* <GenomeViewer data={[genomeViewerData]} refId={genomeViewerData.primary_accession}/> */}
                                </div> 
                            }
                            {featureData && 
                
                                <SequenceViewer start={featureData.start} 
                                                        end={featureData.end} 
                                                        refSequence={featureData.refSequence} 
                                                        currentSequences={featureData.currentSequences} 
                                                        nucPositions={featureData.nucPositions} />
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
                                {insertions.map((insertion, i) => {
                                    const row = insertion.insertion.split(";")
                                    return (
                                        <table className="table table-striped table-bordered table-font" style={{width:"50%"}}>
                                            <thead>
                                                <tr>
                                                    <th>Nucleotide Position</th>
                                                    <th>Insertions</th>
                                                </tr>
                                            </thead>
                                            {row.map((i) => {
                                                const k = i.split(":")
                                                return (
                                            <tbody>
                                                <tr>
                                                    <td><p>{k[0]}</p></td>
                                                    <td>
                                                        <div className='blocks'>
                                                            {k[1].split("").map((nuc) => (
                                                                <div className='block'
                                                                    style={{
                                                                        backgroundColor: nucColors[nuc],
                                                                        width:'15px'
                                                                    }}
                                                                ><b>{nuc}</b></div>
                                                            ))}
                                                        </div>

                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                                )
                                            })}
                                        </table>

                                    )
                                })}
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
