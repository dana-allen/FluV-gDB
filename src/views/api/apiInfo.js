import { useEffect, useState } from "react";
import { useParams, useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import APIPathTable from "./components/APIPathTable"
import APIExample from "./components/APIExample"
import APIOutput from "./components/APIOutput"


const ApiInfo = () => {

    const { id } = useParams();
    const location = useLocation();
    const [runApi, setRunApi] = useState(false);
    var { api } = location.state ?? { api: { get: {parameters: [] } }};

    const fetchJSONDataFrom = (path) => {

        fetch(path)
        .then((response) => {return response.json()})
        .then((jsonData) => { for (const [path, details] of Object.entries(jsonData)) {
                if (details.path_url === id) {
                    return { path, details }; 
                }
            } });
            
    };

    useEffect(() => {
        if(api.length <= 0){
            api = fetchJSONDataFrom(`${process.env.PUBLIC_URL}/openapi_new.json`);
        } 
    });


    return (
        <div className='container'>  
            <h2>{api["get"]["type"]} {api["path_display"]}</h2>

            <p>{api["get"]["description"]}</p>

            <h2><b>Parameters</b></h2>
            <APIPathTable api={api}/>


            <h2><b>Example Requests</b></h2>
            <APIExample api={api} />
            <br></br>
            
            <h2><b>Example Output</b></h2>
            <Button className='btn-main-filled' onClick={e=>setRunApi(true)}>Run</Button>
            <br></br>
            <br></br>
            {runApi && <APIOutput api={api} />}

        </div> 
    );
};
 
export default ApiInfo;

