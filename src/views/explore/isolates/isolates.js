import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

// gDB-core hooks import: This creates an API request to grab the data from the server
import { useApiEndpoint, useFilterParams, useDownload } from '../../../hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "../../../contexts"

// Custom Components
import IsolatesTable from "./IsolatesTable"
import DownloadAlignment from "../../../components/buttons/DownloadAlignment"
import SequencesFilter from '../../../components/filters/SequencesFilter';
// import CladeTree from '../../../components/trees/CladeTree';

// Style imports
// import '../../../assets/styles/sequences.css';


import { useGetIsolates } from '../../../hooks';

const Isolates = () => {
    const { downloadFile } = useDownload();
    const location = useLocation();
    const filters = location.state?.filters ?? null;
    const [params, setParams] = useFilterParams(filters);
    const [data, setData] = useState([])
    const [showFilter, setShowFilter] = useState(false);
    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();

    const { data: isolates, loading, error } = useGetIsolates();



    triggerLoadingWheel(loading);
    triggerError(error)

    // const handleFiltersChange = useCallback((data) => {
    //     setParams(data)
    //     setShowFilter(false);
    // }, []);

    return (
        <div className="container">
            <h2>Isolates</h2>
            <p>This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus sequences from NCBI nucleotide.</p>
            {/* <div className='col-3'>
                <CladeTree onCladeSelect={handleFiltersChange}/>
            </div>*/}
            <div className='col right-align' >
                <ButtonGroup>
                    <Button className="paging-buttons" onClick={() => setShowFilter(true)}> Filters </Button>
                    <div >
                        <Button className="paging-buttons dropdown-toggle " data-bs-toggle="dropdown" > Download </Button>
                        <ul className="dropdown-menu custom-dropdown" >
                            <li><a className="dropdown-item" onClick={() => downloadFile(data, "data.tsv", "tsv")}>Download Metadata</a></li>
                            <li><a className="dropdown-item"><DownloadAlignment filters={filters} sequences={data}></DownloadAlignment></a></li>
                        </ul>
                        
                    </div>
                </ButtonGroup>
            </div> 

            {!loading && 
            
                <div className='padding-table'>
                    <IsolatesTable data={isolates} type={'sequence'} />
                    {/* <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)}/> */}
                </div>
            }

       </div>
       
    );
};
 
export default Isolates;



