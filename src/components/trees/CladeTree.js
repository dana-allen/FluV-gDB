import TreeView from './TreeView';
import { useApiEndpoint } from '../../hooks'

const CladeTree = ({ onCladeSelect }) => {

    const url = "/api/features/get_clades_tree";
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    const handleItemClick = (id) => {

        var params = {};
        if (id[1] === null) {
            params["major_clade"] = id[0]
        } else {
            params["minor_clade"] = id[0]
            params["major_clade"] = id[1]
        }

        onCladeSelect(params)
    }

    return (
        <div>
            <h6> <b> {process.env.REACT_APP_VIRUS_LEVEL}s: </b></h6>
            <TreeView data={endpointData}
                    enableLinks={true}
                    expanded={false}
                    onClick={handleItemClick}
                    style={{
                        paddingLeft:0,
                        height: 240,
                        maxWidth: 400,
                        flexGrow: 1,
                    }} 
            />
        </div>
    );
};

export default CladeTree;