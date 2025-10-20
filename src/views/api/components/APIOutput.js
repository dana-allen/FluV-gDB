import React, { useEffect, useState } from "react";

import useApiEndpoint from '../../../hooks/useApiEndpoint';

import { getParams, getStyles } from '../../../utils/apiHelper'

const APIOutput = ( { api } ) => {

    const [data, setData] = useState([])
    const url = api["path_display"]
    const params = getParams(api)

    const styles = getStyles()
    


    const { endpointData, isPending, endpointError } = useApiEndpoint(url, params);

    useEffect(() => {
        if (endpointData.length != 0){

            setData(JSON.stringify(endpointData, null, 2))
        }
    
    }, [endpointData]);

    return (
       <div style={styles.scrollBox}>
            <pre>{data}</pre>
        </div>
    )
};

export default APIOutput;