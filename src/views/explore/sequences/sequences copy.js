import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

// gDB-core hooks import: This creates an API request to grab the data from the server
import { useApiEndpoint, useFilterParams, useDownload } from '../../../hooks'
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
    const filters = location.state?.filters ?? {"last_id":0};
    // const [params, setParams] = useFilterParams(filters);
    const [data, setData] = useState([])
    const [showFilter, setShowFilter] = useState(false);
    const { triggerError } = useErrorHandler();
    const { triggerLoadingWheel } = useLoadingWheelHandler();

    const [params, setParams] = useState({"last_id":0});
    const url = "/api/sequences/metadata/";
    const { endpointData, isPending, endpointError } = useApiEndpoint(url, params);

    useEffect(() => {
        triggerLoadingWheel(isPending)
        if (endpointError) triggerError(endpointError)
        if (endpointData) setData(endpointData["data"]);
        // if (endpointData["last_id"]) setParams({"last_id":endpointData["last_id"]})

    }, [endpointError, endpointData, isPending]);

    // const handleFiltersChange = useCallback((data) => {
    //     setParams(data)
    //     setShowFilter(false);
    // }, []);

      const handleNextPage = () => {
            setParams({"last_id":endpointData["next_cursor"]}); // trigger next page
        };


    const [currentItems, setCurrentItems] = useState([]);
    const [startRecord, setStartRecord] = useState('')
    const [endRecord, setEndRecord] = useState('')

    const handlePageChange = (items) => {
        const nextCursor = endpointData?.next_cursor;
        // console.log(params.last_id, nextCursor)

        // if (!nextCursor) return;
        setParams((prev) => {
            // Prevent redundant updates
            // if (prev.last_id === nextCursor) return prev;
            return { ...prev, last_id: nextCursor };
        });
        // setCurrentItems(items[0]);
        // setStartRecord(items[1]);
        // setEndRecord(items[2])
    };
    return (
    <div className="p-4">
      <h2>Sequence Table</h2>
      {data && <SequencesTable data={data} type={'sequence'} />}

{/* 
      {data.length > 0 && (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="border px-2 py-1 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="border px-2 py-1">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )} */}

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next Page →
        </button>
      </div>
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
    //         {data && 
    //             <div className='padding-table'>
    //                 <PagingButtons data={data} onPageChange={handlePageChange}> </PagingButtons> 
    //                 <a> Sequences {startRecord} to {endRecord} of {data.length}</a>
    //                 {/* <SequencesTable data={data} type={'sequence'} turnPage={handlePageTurn} /> */}
    //                 {/* <SequencesFilter show={showFilter} onFilterSelect={handleFiltersChange} onClose={() => setShowFilter(false)}/> */}
    //             </div>
    //         }

    //    </div>
       
    // );
};
 
export default Sequences;



