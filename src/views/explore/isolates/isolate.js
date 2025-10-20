import { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

// Hooks and Contexts
import { useApiEndpoint, useDownload } from '../../../hooks';
import { useLoadingWheelHandler, useErrorHandler  } from "../../../contexts"

// Importing stylesheets
import '../../../assets/styles/sequence.css'


const Isolate = () => {

    const { id } = useParams();
    const { downloadFile } = useDownload();
    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const url = `/api/sequence/strain/${id}`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const {
        meta_data,
        segments
    } = endpointData || {};

    console.log(endpointData)

    const pubmedId = meta_data?.pubmed_id;

    useEffect(() => {
        triggerLoadingWheel(isPending)
        if(endpointError) triggerError(endpointError);
        if(endpointData.length > 0) {
            const grouped = groupByIsolate(endpointData);
            setTableData(grouped);
        }
       
    }, [endpointData, endpointError, isPending]);

    const [tableData, setTableData] = useState([]);

    function groupByIsolate(data) {
        let grouped = {};
        const item = data[0]
        console.log(item)

        grouped = {
                    isolate: item.isolate,
                    host: item.host_validated || item.host || "-",
                    isolation_source: item.isolation_source,
                    country: item.country_validated || item.country || "-",
                    collection_date: item.collection_date,
                    strain: item.strain
                };

        // Convert object to array for mapping in JSX
        return grouped;
    }

    return (
        <div className='container'>

            <div className="row col-md-6">
                <h2> Isolate {id} </h2>
            </div>

            { tableData && 
                <div>
                    <div className="row">
                    
                        <div className="col-md-6">
                            <table className="table table-striped table-bordered table-font">
                <tbody>
                    <tr>
                        <td><b>Isolate ID</b></td>
                        <td>{tableData.isolate ? `${tableData.isolate}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Isolation Source</b></td>
                        <td>{tableData.isolation_source ? `${tableData.isolation_source}`:"-"}</td>
                    </tr>
                    <tr>
                        <td><b>Host Species</b></td>
                        <td><em>{tableData.host ? `${tableData.host}`:"-"}</em></td>
                    </tr>
                    <tr>
                        <td><b>Strain</b></td>
                        <td>{tableData.strain}</td>
                    </tr>
                    
                    <tr>
                        <td><b>Collection Date</b></td>
                        <td>{tableData.collection_date}</td>
                    </tr>
                    {/* {regions && 
                        <>
                            <tr>
                                <td><b>Country of Origin</b></td>
                                <td>
                                    {regions.display_name ? `${regions.display_name} ${regions.id ? 
                                    `(${regions.id}) ${tableData.geo_loc ? `/ ${tableData.geo_loc}` : ''}`  :""}`:"-" }
                                </td>
                            </tr>
                            <tr>
                                <td><b>Country Development Status</b></td>
                                <td className='capitalize-text' >
                                    {regions.development_status ? `${regions.development_status} 
                                    ${regions.development_status=='developing' ? `/ ${regions.status}`:""}`:"-"}
                                </td>
                            </tr>
                            <tr>
                                <td><b>Global Region</b></td>
                                <td className='capitalize-text' >
                                    {regions.m49_region_id ? `${regions.m49_region_id}`:"-"} / 
                                    {regions.m49_sub_region_id ? ` ${regions.m49_sub_region_id}`:" -"}
                                </td>
                            </tr>
                        </>
                    } */}
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
            { endpointData &&
                <table className="table table-striped table-bordered table-font">
                    <thead >
                        <tr>
                            <th>NCBI Nucleotide ID</th>
                            <th>Segment</th>
                            <th>Length</th>
                            <th>Serotype</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {endpointData.map((sequence, i) => (
                            <tr key={i} id={i}>

                                <td><b><Link className='gdb-link' to={`/sequence/${sequence.primary_accession}`}> {sequence.primary_accession} </Link> </b></td>
                                <td>{sequence.segment}</td>
                                <td>{sequence.real_length}</td>
                                <td>{sequence.serotype}</td>
                                
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
