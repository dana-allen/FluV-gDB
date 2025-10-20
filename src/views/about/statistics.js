import { useState, useEffect} from "react";
import { useApiEndpoint } from "../../hooks";

const Statistics = () => {

    const [statistics, setStatistics] = useState({});

    const url = `/api/statistics/get_statistics`
    const { endpointData, isPending, error } = useApiEndpoint(url);

    useEffect(() => {
        if (endpointData.length != 0) {
            setStatistics(endpointData)
        }
        
    }, [endpointData]);

  return (
    <div>
        <div className="container">
            <h2>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} Statistics</h2>
            <p>{process.env.REACT_APP_VIRUS_ABB} database was last updated on: <b>{ new Date(parseInt(statistics.pipeline_last_run)* 1000).toLocaleString()}</b></p>
            <table className="table table-striped table-bordered table-font" style={{width:'50%'}}>
                <thead>
                    <col width="50%"/>
                    <col width="50%"/>
                </thead>
    
                <tbody>
                    <tr>
                        <td><b>Number of Sequences</b></td>
                        <td>{statistics.sequences_count}</td>
                    </tr>
                    <tr>
                        <td><b>Number of Reference Sequences</b></td>
                        <td>{statistics.reference_sequences_count}</td>
                    </tr>
                    <tr>
                        <td><b>Latest Collection Year</b></td>
                        <td>{statistics.recent_collection_year}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );

};
 
export default Statistics;
