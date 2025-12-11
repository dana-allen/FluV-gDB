import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';




const SequencesTable = ( { data=null, type=null } ) => {

    const [currentItems, setCurrentItems] = useState([]);
    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')

    const handlePageChange = (items) => {
        setCurrentItems(items[0]);
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    return (
        <div>
            
            {data &&  

                <table className="table table-striped table-bordered table-font">
                    <thead >
                        <tr>
                            <th>NCBI Nucleotide ID</th>
                            <th>Serotype</th>
                            <th>Segment</th>
                            <th>NCBI Entry Creation Date</th>
                            <th>NCBI Last Update Date</th>
                            <th>Sequence Length</th>
                            <th>Isolate ID</th>
                            <th>Country of Origin</th>
                            <th>Host Species</th>
                            <th>Collection Date</th>
                            <th>Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {data.map((sequence, i) => (
                            <tr key={i} id={i}>

                                <td><b><Link className='gdb-link' to={type=='sequence' ? `/sequence/${sequence.primary_accession}`:`/reference/${sequence.primary_accession}` }> {sequence.primary_accession} </Link> </b></td>
                                <td>{sequence["serotype"]}</td>
                                <td>{sequence["segment"]}</td>
                                <td>{sequence.create_date}</td>
                                <td>{sequence.update_date}</td>
                                <td>{sequence.real_length}</td>
                                <td>{sequence.isolate ? `${sequence.isolate}`:"-"}</td>
                                <td>{sequence.country ? `${sequence.country}` :"-"}</td>
                                <td><em>{sequence.host ? `${sequence.host}`:"-"}</em></td>
                                <td>{sequence.collection_date}</td>
                                <td >
                                    { sequence.pubmed_id ? <Link className='gdb-link' to={`https://www.ncbi.nlm.nih.gov/pubmed/${sequence.pubmed_id}`} target="_blank"> <FontAwesomeIcon icon={faLink} /> PubMed {sequence.pubmed_id} </Link>:"-" }
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default SequencesTable;
