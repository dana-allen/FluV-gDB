import { useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// Custom Components
import SequencesTable from "../sequences/SequencesTable"
import DownloadAlignment from "../../../components/buttons/DownloadAlignment"
import SequencesFilter from '../../../components/filters/SequencesFilter';
import CladeTree from '../../../components/trees/CladeTree';

// Hooks & Contexts
import { useApiEndpoint, useFilterParams, useDownload, useSequences } from '../../../hooks'
import { useLoadingWheelHandler, useErrorHandler } from '../../../contexts'; 

// Styling 
import '../../../assets/styles/sequences.css'

const References = ({  } ) => {
    const [showFilter, setShowFilter] = useState(false);
    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();
    const [filters, setFilters] = useState({})

    // const { data } = useFetch(`${process.env.REACT_APP_BACKEND_URL}${'/api/statistics/get_statistics/'}`);
    const [params, setParams] = useState({"items_per_page":10, "accession_type":" reference"});

    const { sequences, nextCursor, prevCursor, totalCount, loading, error } = useSequences(params);
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
      setStartNum(totalCount - itemsPerPage)
      setEndNum(totalCount)
    };
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const onItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage);
      setParams({"items_per_page":newItemsPerPage, ...filters})
    };

    const handleFiltersChange = useCallback((data) => {
      setFilters(data)
        setParams((prev) => ({...prev, ...data}))
        setShowFilter(false);
    }, []);


    console.log(totalCount)

    return (
        <div className="container">
            <h2 >Reference Sequences</h2>
            <p>This dataset contains all {process.env.REACT_APP_VIRUS_NAME} virus reference sequences used for alignment.</p>
            <div className='col-3'>
                <CladeTree onCladeSelect={handleFiltersChange}/>
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

              <a> Sequences {startNum.toLocaleString()} to {endNum.toLocaleString()} of {totalCount.toLocaleString()}</a>
              <SequencesTable data={sequences} type={'reference'} />
              <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)} prevFilters={filters}/>
          </div>
        }
        </div>
       
    );
};
 
export default References;