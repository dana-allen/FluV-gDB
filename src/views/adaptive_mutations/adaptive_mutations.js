import { useEffect, useState } from "react";
import useAdaptiveMutations from "../../hooks/useAdaptiveMutations";
import AdaptiveMutationsTable from "./AdaptiveMutationsTable";
import TreeView from '../../components/trees/TreeView';


const AdaptiveMutations = () => {
    const [data, setData] = useState([])
    const { mutations } = useAdaptiveMutations();
    
    const handleItemClick = (id) => {
        const matches = mutations.filter(mutation => mutation["segment"]==id[0]);
        setData(matches)
    }

    const segments = [{'name': "PB2", 'text': "Segment 1 (PB2)"},
                        {'name': "PB1", 'text': "Segment 2 (PB1)"},
                        {'name': "PA", 'text': "Segment 3 (PA)"},
                        {'name': "HA", 'text': "Segment 4 (HA)"},
                        {'name': "NP", 'text': "Segment 5 (NP)"},
                        {'name': "NA", 'text': "Segment 6 (NA)"},
                        {'name': "M", 'text': "Segment 7 (M)", 'nodes':[{'name': "M1", 'text': "M1"},{'name': "M2", 'text': "M2"}]},
                        {'name': "NS", 'text': "Segment 8 (NS)"}
    ]

    useEffect(() => {
        setData(mutations)
    }, [mutations] )


    return (
        <div className="container">
            <h2>Adaptive Mutations</h2>
            <p>
                The Adaptation Mutations provides detection and analysis of mammalian adaptions in 
                an amino acid sequence. Click on a table row to visualise an interactive chart of the 
                frequencies of amino acids aligned at that position across our dataset of cluster 
                representative sequences.
            </p>
            <div className='col-3'>
                <h6> Segments:</h6>
                <TreeView data={segments}
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
            <br></br>
            <AdaptiveMutationsTable mutations={data} />
        
        </div>
    );
};

export default AdaptiveMutations;
