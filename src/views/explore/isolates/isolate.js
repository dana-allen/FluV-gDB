import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

// Hooks and Contexts
import { useGetIsolate } from '../../../hooks';
import { useLoadingWheelHandler, useErrorHandler  } from "../../../contexts"

// Importing stylesheets
import '../../../assets/styles/sequence.css'


const Isolate = () => {

    const { id } = useParams();
    const decodedId = decodeURIComponent(id);

    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    // Hooks
    const { data: isolate, pubmedId, segments, loading, error } = useGetIsolate(decodedId);
    triggerLoadingWheel(loading);
    triggerError(error)


    return (
        <div className='container'>

            <div className="row col-md-6">
                <h2> Isolate {decodedId} </h2>
            </div>

            { isolate && 
                <div>
                    <div className="row">
                    
                        <div className="col-md-6">
                            <table className="table table-striped table-bordered table-font">
                <tbody>
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
                        <td><b>Strain</b></td>
                        <td>{isolate.strain}</td>
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
            { segments &&
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
            }

            <br></br>

        </div>
    );
};
 
export default Isolate;
