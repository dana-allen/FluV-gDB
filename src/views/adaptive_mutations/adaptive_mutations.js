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
import { RotatingLines } from 'react-loader-spinner'

import '../../assets/styles/adaptive_mutations.css'

function groupByHost(data, residue) {

    const counts = {};

    data.forEach(({ primary_accession, host, protein }) => {
        if (!protein || protein.length < residue) return;

        // Position 4 (1-based) = index 3
        const aa = protein[residue-1];

        if (!counts[host]) counts[host] = {};
        if (!counts[host][aa]) counts[host][aa] = new Set();

        counts[host][aa].add(primary_accession);
    });

    const hosts = Object.keys(counts);

    const xLabels = hosts.map(host => ({ label: host }));

    // Collect all amino acids
    const aminoAcids = new Set();
    hosts.forEach(host => {
        Object.keys(counts[host]).forEach(aa => aminoAcids.add(aa));
    });

    const series = Array.from(aminoAcids).map(aa => ({
        label: aa,
        stack: "total",
        data: hosts.map(host =>
            counts[host][aa] ? counts[host][aa].size : 0
        )
    }));

    return {xLabels, series}
}


const AdaptiveMutations = () => {
  
    const [data, setData] = useState([])
    const { mutations } = useAdaptiveMutations();
    const [segment, setSegment] = useState('Segment 1 (PB2)')
    const { translated_sequences } = useAdaptiveMutationsChart('PB2');
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

  const [residue, setResidue] = useState();
  const handleResidueClick = (e) => {
    setResidue(e)
  };

  const {xLabels, series} = translated_sequences ? groupByHost(translated_sequences, residue) : {}
   

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
                <Typography>
                  Frequency of amino acids at consensus position
                </Typography>
                <Typography style={{'fontSize':'10px'}} marginBottom={2}>
                  {segment} Position {residue}
                </Typography>
                {xLabels ? 
                  <div>
                  
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
                          sx: {
                            fontSize: 14,
                          
                            
                          },
                        },
                      }}
                      /> 
                      <ul style={{marginLeft: '30px', marginRight: '30px', fontSize:'12px'}}>
                        <li>Amino acid positions for HA mutations are based on mature peptide numbering.</li> 
                        <li>Amino acid positions for mutations in all other segments are based on full-length 
                        protein numbering.</li>
                      </ul>
                  </div>
                  :
                  <div style={{ display:'flex',
                                'justify-content':'center', 
                                'align-items':'center',
                                'height':'100%'  }}>
                    <div className='align-center'>

                      <RotatingLines visible={true}
                            height="45"
                            width="45"
                            strokeColor="var(--primary)"
                            strokeWidth="5"
                            animationDuration="1"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""/>
        </div>
                  </div>

                }

            </div>

            </div>
            
            <br></br>

            <p>view: <Button size='sm' className='btn-table-sequence' onClick={()=>handleChange(0)}>Table</Button> 
                    <Button size='sm' className='btn-table-sequence' onClick={()=>handleChange(1)}>Sequence </Button>
            </p>
            <hr></hr>
              {tab === 0 && <AdaptiveMutationsTable mutations={data} residueClick={handleResidueClick}/>}
              {tab === 1 && <ProteinSequence selectedSegement={segment} mutations={data} residueClick={handleResidueClick} translated_sequences={translated_sequences}/>}
        </div>
    );
};

export default AdaptiveMutations;
