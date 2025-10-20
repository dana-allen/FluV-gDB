import { useEffect } from "react";
import { useLoadingWheelHandler } from "../../contexts";
import { useApiEndpoint } from "../../hooks";

const packageJson = require('../../../package.json'); 

const Version = () => {
    const url = `/api/get_vgt_version/`;
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);
    // const { triggerError } = useErrorHandler();
    // const { triggerLoadingWheel } = useLoadingWheelHandler();
    // useEffect(() => {
    //     triggerLoadingWheel(isPending)
    //     // if (endpointError) triggerError(endpointError)
    // }, [endpointError, isPending]);

    return (
            <div style={{'width':"50%"}}>
                <table className="table table-striped table-bordered table-font">
                    <tbody>
                        { endpointData.map((version, i) => (
                            <tr key={i}>
                                <td><b>{version.Software}</b></td>
                                <td>{version.Version}</td>
                            </tr>
                        ))}
                        <tr>
                            <td><b>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} version</b></td>
                            <td>{packageJson.version}</td>
                        </tr>

                    </tbody>
                    
                </table>
            </div>
    );
};
 
export default Version;
