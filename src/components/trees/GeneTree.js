import React, {useState, useEffect} from 'react';
import TreeView from './TreeView';


import useApiEndpoint from '../../hooks/useApiEndpoint';

const GeneTree = ({ onGenomePicked }) => {

    const [genes, setGenes] = useState([]);

    const url = "/api/genes/get_genes_tree"
    
    const { endpointData, isPending, endpointError } = useApiEndpoint(url);

    useEffect(() => {
        if (endpointData.length != 0){
            setGenes(endpointData)
        }
    }, [endpointData]);

    const handleItemClick = (value) => {onGenomePicked(value[0]);}

    return (
        <div>
            <TreeView data={genes}
                    enableLinks={true}
                    expanded={true}
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

export default GeneTree;