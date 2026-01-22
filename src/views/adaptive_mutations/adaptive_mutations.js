import React, { useEffect, useState } from "react";
import useAdaptiveMutations from "../../hooks/useAdaptiveMutations";
import AdaptiveMutationsTable from "./AdaptiveMutationsTable";
import TreeView from '../../components/trees/TreeView';
import { useAdaptiveMutationsChart } from '../../hooks'
import Typography from '@mui/material/Typography';
import { BarChart } from "@mui/x-charts";
import ProteinSequence from "./protein_sequence";
import { Button } from "react-bootstrap";
import { Tabs, Tab, Box } from "@mui/material";


const AdaptiveMutations = () => {
  
    const [data, setData] = useState([])
    const { mutations } = useAdaptiveMutations();
    const [segment, setSegment] = useState('Segment 1 (PB2)')
    const { translated_sequences, xLabels, series } = useAdaptiveMutationsChart('PB2');
    // console.log("TRANSLATED SEQUENCES", xLabels, series)
    const handleItemClick = (id) => {
        const matches = mutations.filter(mutation => mutation["segment"]==id[0]);
        console.log(id)
        setSegment(id[2])
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


    const [tab, setTab] = React.useState(0);

  const handleChange = (newValue) => {
    setTab(newValue);
  };
   

    return (
        <div className="container" >
            <h2>Adaptive Mutations</h2>
            <p>
                The Adaptation Mutations provides detection and analysis of mammalian adaptions in 
                an amino acid sequence. Click on a table row to visualise an interactive chart of the 
                frequencies of amino acids aligned at that position across our dataset of cluster 
                representative sequences.
            </p>
            <div className='row'>
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
              <div className='col-9'>
                {xLabels && 
                  <div>
                  <Typography>
                      Frequency of amino acids at consensus position
                    </Typography>
                    <Typography style={{'fontSize':'10px'}} marginBottom={2}>
                      {segment} Position {4}
                    </Typography>
                    <BarChart
            
                      //   onItemClick={(event, d) => clickHandler(event, d, series)}
                        xAxis={[
                          {
                            scaleType: "band",
                            data: xLabels.map(({ label }) => label),
                            label: "Amino Acid",
                          },
                        ]}
                        yAxis={[{ label: "Frequency (%)", max: 100 }]} // Ensure Y-axis is 0-100%
                        series={series}
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
                      /> 
                      <p style={{marginLeft: '30px', marginRight: '30px', fontSize:'12px'}}>
                        Amino acid positions for HA mutations are based on mature peptide numbering. 
                        Amino acid positions for mutations in all other segments are based on full-length 
                        protein numbering.
                      </p>
                  </div>

                }

            </div>

            </div>
            
            <br></br>

            <p>View <Button className='btn-main' onClick={()=>handleChange(0)}>Table</Button> 
                    <Button className='btn-main' onClick={()=>handleChange(1)}>Sequence </Button>
            </p>
            <hr></hr>
              {tab === 0 && <AdaptiveMutationsTable mutations={data} />}
              {tab === 1 && <ProteinSequence selectedSegement={segment} mutations={data} />}
           


            {/* <AdaptiveMutationsTable mutations={data} />

            <ProteinSequence /> */}
            

            
        
        </div>
    );
};

export default AdaptiveMutations;
