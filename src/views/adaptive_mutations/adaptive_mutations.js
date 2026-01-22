import { useEffect, useState } from "react";
import useAdaptiveMutations from "../../hooks/useAdaptiveMutations";
import AdaptiveMutationsTable from "./AdaptiveMutationsTable";
import TreeView from '../../components/trees/TreeView';
import { useAdaptiveMutationsChart } from '../../hooks'

import { BarChart } from "@mui/x-charts";

const AdaptiveMutations = () => {
    const [data, setData] = useState([])
    const { mutations } = useAdaptiveMutations();

    const { translated_sequences, xLabels, series } = useAdaptiveMutationsChart('PB2');
    console.log("TRANSLATED SEQUENCES", xLabels, series)
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
        <div className="container" >
            {/* <h2>Adaptive Mutations</h2>
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
            <AdaptiveMutationsTable mutations={data} /> */}

            {xLabels && <BarChart
        
        //   onItemClick={(event, d) => clickHandler(event, d, series)}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels.map(({ label }) => label),
              label: "Percentage of sequences with given combination of mutations",
            },
          ]}
        //   yAxis={[{ label: "Percentage (%)", max: 100 }]} // Ensure Y-axis is 0-100%
          series={series}
          // width={800}
          height={400}
          slotProps={{
            legend: {
              sx: { padding: 25 },
              position: { 
                vertical: 'top',
                horizontal: 'end'
              }
            }
          }}
        /> }
        
        </div>
    );
};

export default AdaptiveMutations;
