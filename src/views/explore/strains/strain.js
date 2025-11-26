import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
// Hooks and Contexts
import { useGetStrain} from '../../../hooks';
import { useLoadingWheelHandler, useErrorHandler  } from "../../../contexts"

// Importing stylesheets
import '../../../assets/styles/sequence.css'
import GenomeViewer from '../../../components/genomeViewer/GenomeViewer'
import SequenceViewer from '../../../components/genomeViewer/SequenceViewer';
const Isolate = () => {

    const { id } = useParams();
    const decodedId = decodeURIComponent(id);

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    // Hooks
    const { data: isolate, pubmedId, segments, loading, error } = useGetStrain(decodedId);
    triggerLoadingWheel(loading);
    triggerError(error);

    const segments2 = [
                    {"segment":"PB1", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 1, "end":7}, {"name": "Matrix Protein", "start": 90, "end":120}], "alignedSeq": [{"query":"MK592506", "seq": 'AGCTGAGGA'}], "seq":"ACCTGAGTA"}},
                    {"segment":"PB2", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 2, "end":5}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}},
                    {"segment":"HA", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 28, "end":2304}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}},
                    {"segment":"M", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 28, "end":2304}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}},
                    {"segment":"PA", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 28, "end":2304}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}},
                    {"segment":"NP", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 28, "end":2304}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}},
                    {"segment":"NA", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 28, "end":2304}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}},
                    {"segment":"NS", "data": {"primary_accession": "OQ793983", "features": [{"name": "polymerase PB2", "start": 28, "end":2304}], "alignedSeq": [{"query":"MK592506", "seq": 'ASCVS'}], "seq":"ACVSDS"}}
                ]

    const [featureData, setFeatureData] = useState(null)

    return (
        <div className='container'>

            <div className="row col-md-6">
                <h2> Strain {decodedId} </h2>
            </div> 
            
        
            { isolate && 
                <div>
                    <div className="row">
                    
                        <div className="col-md-6">
                            <table className="table table-striped table-bordered table-font">
                <tbody>
                    <tr>
                        <td><b>Strain</b></td>
                        <td>{isolate.strain}</td>
                    </tr>
                    <tr>
                        <td><b>Isolate ID</b></td>
                        <td>{isolate.isolate ? `${isolate.isolate}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Isolation Source</b></td>
                        <td>{isolate.isolation_source ? `${isolate.isolation_source}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Host Species</b></td>
                        <td><em>{isolate.host ? `${isolate.host}`:"-"}</em></td>
                    </tr>
                    
                    
                    <tr>
                        <td><b>Collection Date</b></td>
                        <td>{isolate.collection_date}</td>
                    </tr>
                
                </tbody>
            </table>
                        </div>
                    </div>
                
                    <br></br>

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

            <div style = {{'width':'100%'}} >
                <div style = {{'display': 'flex', 'overflow-x': 'scroll', alignItems: "stretch"}}>
                    {segments2.map((segment, i) => (
                        <div style={{ 
                                        minWidth: "500px", 
                                        marginLeft: "1rem", 
                                        paddingLeft: "1rem", 
                                        borderRight: i !== segments2.length - 1 ? "2px solid #ccc" : "none", 
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}>
                            <h6>{segment.segment}</h6>
                            <h6><Link className='gdb-link'><b>{segment.data.alignedSeq[0].query}</b></Link></h6>
                            <GenomeViewer data={[segment.data]} refId={segment.data.primary_accession} setFeatureData={setFeatureData}/>
                            {/* <GenomeViewer data={[segment.data]}/> */}
                        </div>          
                    ))}
                

                </div>
                {featureData && 
                
                <SequenceViewer start={featureData.start} 
                                        end={featureData.end} 
                                        refSequence={featureData.refSequence} 
                                        currentSequences={featureData.currentSequences} 
                                        nucPositions={featureData.nucPositions} />
                }

            </div>



            {/* { segments &&
                <table className="table table-striped table-bordered table-font">
                    <thead >
                        <tr>
                            <th>Segment</th>
                            <th>NCBI Nucleotide ID</th>
                            <th>Length</th>
                            <th>Serotype</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {segments.map((segment, i) => (
                            <tr key={i} id={i}>
                                <td>{segment.segment}</td>
                                <td><b><Link className='gdb-link' to={`/sequence/${segment.primary_accession}`}> {segment.primary_accession} </Link> </b></td>
                                <td>{segment.real_length}</td>
                                <td>{segment.serotype}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            } */}

            <br></br>

        </div>
    );
};
 
export default Isolate;
