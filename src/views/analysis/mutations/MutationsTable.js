import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import PagingButtons from '../../../components/buttons/PagingButtons'

import * as d3 from "d3";
import { Button } from 'react-bootstrap';

import { useDownload } from '../../../hooks'

const MutationsTable = ( { mutations  } ) => {
    const { downloadFile } = useDownload();
    const [currentItems, setCurrentItems] = useState([]);
    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')

    const handlePageChange = (items) => {
        setCurrentItems(items[0]);
        setStartRecord(items[1]);
        setEndRecord(items[2])
    };

    const [codonHeader, setCodonHeader] = useState([]);
    const [colorScale, setColorScale] = useState(d3.scaleOrdinal()); // Default color scale

    useEffect(() => {
        if(! mutations) return;
        if (mutations.length > 0) {
            const uniqueMutations = [
                ...new Set(mutations.flatMap((d) => Object.values(d.mutations))),
            ];

            const newColorScale = d3.scaleOrdinal()
                .domain(uniqueMutations)
                .range(uniqueMutations.map((_, i) => d3.interpolateTurbo(i / uniqueMutations.length * 0.8 + 0.1)));

            setColorScale(() => newColorScale);
        }
        const uniqueCodons = [
            ...new Set(mutations.flatMap((d) => Object.keys(d.mutations))),
        ];
        

        setCodonHeader(uniqueCodons)
    }, [mutations]); // Runs whenever `mutations` change

    return (
        
        <div>
            <div className='row'>
                <div className="col">
                    <PagingButtons data={mutations} onPageChange={handlePageChange}> </PagingButtons> 
                </div>
                <div style={{'text-align':'right'}} className='col'>
                    <Button className='btn-main-filled' size='sm' onClick={() => downloadFile(mutations, "data.csv", "csv")}>Download</Button>
                </div>
            </div>

            <a >Sequences {startRecord} to {endRecord} of {mutations.length}</a>
            <table className="table table-striped table-bordered table-font">
                <thead >
                    <tr>
                        <th colSpan={8}></th>
                        <th colSpan={codonHeader.length}>Amino Acid</th>
                    </tr>
                    <tr>
                        <th>NCBI Nucleotide ID</th>
                        <th>{process.env.REACT_APP_VIRUS_LEVEL}</th>
                        <th>NCBI Entry Creation Date</th>
                        <th>NCBI Last Update Date</th>
                        <th>Sequence Length</th>
                        <th>Isolate ID</th>
                        <th>Country of Origin</th>
                        <th>Host Species</th>
                        {codonHeader.map((h, i) => (
                            <th>{h}</th>
                        ))}
                    
                    </tr>
                </thead>
                <tbody>
                    
                    {currentItems.map((sequence, i) => (
                        
                        <tr key={i} id={i}>

                            <td><Link className='custom-link' to={`/sequence/${sequence.primary_accession}`}> {sequence.primary_accession} </Link> </td>
                            <td>{sequence["display_name"]}</td>
                            <td>{sequence.create_date}</td>
                            <td>{sequence.update_date}</td>
                            <td>{sequence.length}</td>
                            <td>{sequence.isolate ? `${sequence.isolate}`:"-"}</td>
                            <td>{sequence.country ? `${sequence.country}` :"-"}</td>
                            <td><em>{sequence.host ? `${sequence.host}`:"-"}</em></td>

                            {codonHeader.map((h, i) => (
                                <td style={{
                                        backgroundColor: sequence.mutations[h] 
                                            ? colorScale(sequence.mutations[h]) 
                                            : "transparent" 
                                    }}>
                                    {sequence.mutations[h] || ""}
                                </td>
                            ))}
                            
                        </tr>
                
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MutationsTable;
