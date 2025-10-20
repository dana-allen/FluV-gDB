import { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import PagingButtons from '../../../components/buttons/PagingButtons';

const IsolatesTable = ( { data=null } ) => {

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
            <PagingButtons data={data} onPageChange={handlePageChange}> </PagingButtons> 
            <a> Strains {startRecord} to {endRecord} of {data.length}</a>
            {data &&  

                <table className="table table-striped table-bordered table-font">
                    <thead >
                        <tr>
                            <th rowSpan={2}>Strain</th>
                            <th rowSpan={2}>Country</th>
                            <th rowSpan={2}>Host</th>
                            <th rowSpan={2}>Collection Date</th>
                            <th style={{textAlign: 'center'} }colSpan={process.env.REACT_APP_NUMBER_OF_SEGMENTS}>Segment</th>
                        </tr>
                        <tr>
                            {Array.from({ length: Number(process.env.REACT_APP_NUMBER_OF_SEGMENTS) }, (_, i) => (
                                <th key={i}>{i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((sequence, i) => (
                            <tr key={i} id={i}>
                            <td>
                                <b>
                                <Link className="gdb-link" to={`/isolate/${sequence.isolate}`} >
                                    {sequence.isolate}
                                </Link>
                                </b>
                            </td>

                            <td>{sequence.country || "-"}</td>
                            <td><em>{sequence.host || "-"}</em></td>
                            <td>{sequence.collection_date}</td>
                            
                            {/* 👇 Loop through number of segments and render accession cells */}
                            {Array.from({ length: Number(process.env.REACT_APP_NUMBER_OF_SEGMENTS) }, (_, idx) => {
                                const segmentNumber = idx + 1;
                                const accession = sequence.segments?.[segmentNumber]; // safe optional chaining

                                return (
                                    <td key={segmentNumber}>
                                        {accession ? 
                                            (
                                                <Link className="gdb-link" to={`/sequence/${accession}`}>
                                                    {accession}
                                                </Link>
                                            ) : (  "-" )
                                        }
                                    </td>
                                );
                            })}
                            </tr>
                        ))}
                    </tbody>

                </table>
            }
        </div>
    );
};

export default IsolatesTable;
