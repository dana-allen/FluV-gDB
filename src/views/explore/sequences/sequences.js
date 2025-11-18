import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ButtonGroup, FormText } from 'react-bootstrap';

// gDB-core hooks import: This creates an API request to grab the data from the server
import { useApiEndpoint, useFilterParams, useDownload, useSequences, useFetch } from '../../../hooks'
import { useLoadingWheelHandler, useErrorHandler  } from "../../../contexts"

// Custom Components
import SequencesTable from "./SequencesTable"
import DownloadAlignment from "../../../components/buttons/DownloadAlignment"
import SequencesFilter from '../../../components/filters/SequencesFilter';
import CladeTree from '../../../components/trees/CladeTree';

// Custom Components
import PagingButtons from '../../../components/buttons/PagingButtons';

// Style imports
import '../../../assets/styles/sequences.css';


const Sequences = () => {
    const { downloadFile } = useDownload();
    const location = useLocation();
    // const filters = location.state?.filters ?? {}
    // const [params, setParams] = useFilterParams(filters);
    // const [data, setData] = useState([])
    const [showFilter, setShowFilter] = useState(false);
    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();
  const [filters, setFilters] = useState({})

    const { data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}${'/api/statistics/get_statistics/'}`);
    const [params, setParams] = useState({"items_per_page":10});

    const { sequences, nextCursor, prevCursor, loading, error } = useSequences(params);
    triggerLoadingWheel(loading);
    triggerError(error);

    const [startNum, setStartNum] = useState(1)
    const [endNum, setEndNum] = useState(10)

    const handleFirstPage = () => {
      setParams({"items_per_page":itemsPerPage, ...filters}); // trigger next page
      setStartNum(1)
      setEndNum(itemsPerPage)
    };
    const handleNextPage = () => {
      setParams({"next_cursor":nextCursor, "items_per_page":itemsPerPage, ...filters}); // trigger next page
      setStartNum(startNum + itemsPerPage)
      setEndNum(endNum + itemsPerPage)
    };

    const handlePreviousPage = () => {
      setParams({"prev_cursor":prevCursor, "items_per_page":itemsPerPage, ...filters}); // trigger next page
      setStartNum(startNum - itemsPerPage)
      setEndNum(endNum - itemsPerPage)
    };

    const handleLastPage = () => {
      setParams({"prev_cursor":0, "items_per_page":itemsPerPage, ...filters}); // trigger next page
      setStartNum(data.sequences_count - itemsPerPage)
      setEndNum(data.sequences_count)
    };
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const onItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage);
      setParams({"items_per_page":newItemsPerPage, ...filters})
    };

    const handleFiltersChange = useCallback((data) => {
      console.log(data)
      setFilters(data)
        setParams((prev) => ({...prev, ...data}))
        setShowFilter(false);
    }, []);

    return (
      <div className="container">
        <h2>Sequence Table</h2>
        <p>This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus sequences from NCBI nucleotide.</p>
        <div className='col-3'>
          {/* <CladeTree onCladeSelect={handleFiltersChange}/> */}
        </div>
        {sequences && 
        <div className='padding-table'>
          <div>
            <Button size="sm" className="paging-buttons" disabled={params["next_cursor"] === 0} onClick={handleFirstPage}> First</Button> {''}
            <div className="btn-group">
                <Button size="sm" className="paging-buttons" disabled={params["next_cursor"] === 0} onClick={handlePreviousPage}> Previous </Button> {''}
                <Button size="sm" className="paging-buttons" disabled={params["prev_cursor"] === 0} onClick={handleNextPage}> Next </Button> {''}
            </div> {''}
            <Button size="sm" className="paging-buttons" disabled={params["prev_cursor"] === 0} onClick={handleLastPage}> Last </Button> {''}
            <Button size="sm" className="paging-buttons dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" >
                Items per page: {itemsPerPage}
            </Button>
            <div className="dropdown-menu custom-dropdown" aria-labelledby="dropdownMenuButton">
                <a onClick={() => onItemsPerPageChange(10)} className="dropdown-item" >10</a>
                <a onClick={() => onItemsPerPageChange(25)} className="dropdown-item" >25</a>
                <a onClick={() => onItemsPerPageChange(50)} className="dropdown-item" >50</a>
            </div>
            <Button className="paging-buttons" onClick={() => setShowFilter(true)}> Filters </Button>
        </div>

            <a> Sequences {startNum.toLocaleString()} to {endNum.toLocaleString()} of {data ? data.sequences_count.toLocaleString() : ''}</a>
            <SequencesTable data={sequences} type={'sequence'} />
            <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)} prevFilters={filters}/>
        </div>
        }

        </div>
      );


    // return (
    //     <div className="container">
    //         <h2>Sequences</h2>
    //         <p>This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus sequences from NCBI nucleotide.</p>
    //         <div className='col-3'>
    //             {/* <CladeTree onCladeSelect={handleFiltersChange}/> */}
    //         </div>
    //         <div className='col right-align' >
    //             <ButtonGroup>
    //                 <Button className="paging-buttons" onClick={() => setShowFilter(true)}> Filters </Button>
    //                 <div >
    //                     <Button className="paging-buttons dropdown-toggle " data-bs-toggle="dropdown" > Download </Button>
    //                     <ul className="dropdown-menu custom-dropdown" >
    //                         <li><a className="dropdown-item" onClick={() => downloadFile(data, "data.tsv", "tsv")}>Download Metadata</a></li>
    //                         {/* <li><a className="dropdown-item"><DownloadAlignment filters={filters} sequences={data}></DownloadAlignment></a></li> */}
    //                     </ul>
                        
    //                 </div>
    //             </ButtonGroup>
    //         </div>
            // {data && 
            //     <div className='padding-table'>
            //         <PagingButtons data={data} onPageChange={handlePageChange}> </PagingButtons> 
            //         <a> Sequences {startRecord} to {endRecord} of {data.length}</a>
            //         {/* <SequencesTable data={data} type={'sequence'} turnPage={handlePageTurn} /> */}
            //         {/* <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)}/> */}
            //     </div>
            // }

    //    </div>
       
    // );
};
 
export default Sequences;



