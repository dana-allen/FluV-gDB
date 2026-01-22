import { useEffect, useState } from 'react';

import PagingButtons from '../../components/buttons/PagingButtons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const AdaptiveMutationsTable = ( { mutations=null, residueClick } ) => {
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
            <ul style={{fontSize:"12px"}}>
                <li>Click on a table row to visualise an interactive chart of the frequencies of amino acids aligned at that position across our dataset of cluster representative sequences.</li>
            </ul>
            {mutations && 
            
            <div>
                <PagingButtons data={mutations} onPageChange={handlePageChange}> </PagingButtons> 
                <a>Mutations {startRecord} to {endRecord} of {mutations.length}</a>
                
                

                    <table className="table table-striped table-bordered table-font">
                        <thead >
                            <tr>
                                <th>Segment</th>
                                <th>Mutation</th>
                                <th>Position</th>
                                <th>Subtype</th>
                                <th>Paper</th>
                                <th>View Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {currentItems.map((mutation, i) => (
                                <tr key={i} id={i}>
                                    <td>{mutation["segment"]}</td>
                                    <td>{mutation["mutation"]}</td>
                                    <td>{mutation["position"]}</td>
                                    <td>{mutation["virus"]}</td>
                                    <td>
                                        { mutation.doi ? <Link className='gdb-link' to={`https://www.ncbi.nlm.nih.gov/pubmed/${mutation.doi}`} target="_blank"> <FontAwesomeIcon icon={faLink} /> {mutation.authors} </Link>:"-" }
                                    </td>
                                    <td><Button size="sm" 
                                                className="paging-buttons" 
                                                onClick={()=>residueClick(mutation["position"])}> View</Button></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
};

export default AdaptiveMutationsTable;
