import { useState, useEffect } from "react";
// import SwaggerUI from "swagger-ui-react";
// import "swagger-ui-react/swagger-ui.css"
// import  APITable  from './components/APITable';
import { Link } from 'react-router-dom';
import { groupPathsByTags } from '../../utils/apiHelper';


import '../../assets/styles/offlineApi.css'


const Api = () => {

    const [api, setApi] = useState({paths:{}})
    const [groupedPaths, setGroupedPaths] = useState({});

    const fetchJSONDataFrom = (path) => {
        fetch(path)
            .then((response) => {return response.json()})
            .then((jsonData) => {
                console.log(jsonData)
                setApi(jsonData); 
                setGroupedPaths(groupPathsByTags(jsonData.paths));
            });
    }
    

    useEffect(() => {
        fetchJSONDataFrom(`${process.env.PUBLIC_URL}/openapi_new.json`);
    }, []);

    return (
        <div className='container'>  
            <h2>API Endpoints</h2>
            <p>Implement these API endpoints to access {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} data for local usage.</p>

            {/* <SwaggerUI url="/openapi_new.json"
                        defaultModelsExpandDepth={-1} /> */}
            {/* <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json"/> */}

            <div>
                {Object.keys(groupedPaths).length > 0 && (
                    <div>
                        {Object.entries(groupedPaths).map(([tag, paths]) =>
                            <div>
                                <h3><b>{api["tags"].filter(e => e.name === tag)[0]["display_name"]}</b></h3>
                                <p>{api["tags"].filter(e => e.name === tag)[0]["description"]}</p>
                                <hr></hr>
                                <table className="table table-striped " style={{"font-size":"12px"}}>
                                    <thead>
                                        <tr>
                                            <th width='10%'>Type</th>
                                            <th width='40%'>API Endpoint</th>
                                            <th width="50%">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paths.map((item, index) => (
                                            <tr key={`${tag}-${index}`}>
                                                <td>{item.type}</td>
                                                <td><Link state={{api:api["paths"][item.path]}}
                                                            className='custom-link' 
                                                            to={`/apiInfo/${api["paths"][item.path]["path_url"]}`}>
                                                        {item.path}</Link></td>
                                                <td>{item.summary}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        </div>
                    )}
            </div>
        </div> 
    );
};
 
export default Api;
