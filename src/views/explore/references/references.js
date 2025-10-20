import { useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// Custom Components
import SequencesTable from "../sequences/SequencesTable"
import DownloadAlignment from "../../../components/buttons/DownloadAlignment"
import SequencesFilter from '../../../components/filters/SequencesFilter';
import CladeTree from '../../../components/trees/CladeTree';

// Hooks & Contexts
import { useApiEndpoint, useFilterParams, useDownload } from '../../../hooks'
import { useLoadingWheelHandler, useErrorHandler } from '../../../contexts'; 

// Styling 
import '../../../assets/styles/sequences.css'

const References = ({ filters=null } ) => {
    const { downloadFile } = useDownload();
    // Contexts
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const { triggerError } = useErrorHandler();

    const [params, setParams] = useFilterParams(filters);
    const [data, setData] = useState([])
    const [showFilter, setShowFilter] = useState(false);

    const url = "/api/sequences/reference/metadata/";
    const { endpointData, isPending, endpointError } = useApiEndpoint(url, params);
    
    useEffect(() => {
        triggerLoadingWheel(isPending)
        if (endpointError) triggerError(endpointError)
        if (endpointData) setData(endpointData);
    }, [endpointError, endpointData, isPending]);

    const handleFiltersChange = useCallback((data) => {
        setParams(data);
        setShowFilter(false);
    }, []);
    

    return (
        <div className="container">
            <h2 >Reference Sequences</h2>
            <p>This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus reference sequences used for alignment.</p>
            <div className='col-3'>
                <CladeTree onCladeSelect={handleFiltersChange}/>
            </div>
            <div className='col right-align' >
                <ButtonGroup>
                    <Button className="paging-buttons" onClick={() => setShowFilter(true)}> Filters </Button>
                    <div >
                        <Button className="paging-buttons dropdown-toggle " data-bs-toggle="dropdown" > Download </Button>
                        <ul className="dropdown-menu custom-dropdown" >
                            <li><a className="dropdown-item" onClick={() => downloadFile(data, "data.csv", "csv")}>Download Metadata</a></li>
                            <li><a className="dropdown-item"><DownloadAlignment filters={filters} sequences={data}></DownloadAlignment></a></li>
                        </ul>
                        
                    </div>
                </ButtonGroup>   
            </div>

            <div className='padding-table'>
                <SequencesTable data={data} type={'reference'}/>
                <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)}/>
            </div>

        </div>
       
    );
};
 
export default References;