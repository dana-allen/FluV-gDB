import { useState,  useRef, useEffect } from "react";
// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {FormGroup, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio} from '@mui/material'
// import Taxonium from "taxonium-component";
// import Taxonium from "taxonium-component";
// import { TaxoniumWrapper } from "taxonium-component";
import { usePhylogenyTree } from '../../hooks'

const Phylogeny = () => {

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const { tree, meta_data, loading, error } = usePhylogenyTree();
  console.log(tree)
  const nwk = `((A:0.1,B:0.2):0.3,(C:0.4,D:0.5):0.6);`;

     
      // Metadata is optional
      // const metadata = {
      //   filename: "test.csv",
      //   data: meta_data && meta_data,
      //   status: "loaded",
      //   filetype: "meta_csv",
      // };

      const metadata_text = `Node,Name,Species
A,Bob,Cow
B,Jim,Cow
C,Joe,Fish
D,John,Fish`;

const metadata = {
  filename: "test.csv",
  data: metadata_text,
  status: "loaded",
  filetype: "meta_csv",
};

      const sourceData = {
        status: "loaded",
        filename: "test.nwk",
        data: nwk,
        filetype: "nwk",
        metadata: metadata,
      };

    // const sourceData= {
    //   status: "loaded",
    //   filename: "test.nwk",
    //   data: tree && tree,
    //   filetype: "nwk",
    //   // metadata: metadata,
    // }

    const handleNodeDetailsLoaded = (e, f) => {
      console.log(f)
    }

    
  return (
    
    <div className='container' width="100%" height="100%">
      <h2>Phylogeny Tree</h2>

      <div  style={{width:"100%", height:'100px'}}>
        <div className='row' style={{width:"50%"}}>
          <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue="view"
                // onChange={e => handleChange(e.target.value)}  
            >
                <FormControlLabel value="view"
                                    control={<Radio size="small" 
                                                    sx={{
                                                        color: 'var(--primary)',
                                                        '&.Mui-checked': {color: 'var(--primary)',},
                                                    }}/>} 
                                                    label="View" />
                <FormControlLabel value={"query"} 
                                    control={<Radio size="small" 
                                                    sx={{
                                                        color: 'var(--primary)',
                                                        '&.Mui-checked': {color: 'var(--primary)',},
                                                    }}/>}  label="Query" />
                 <FormControlLabel value={"position"} 
                                    control={<Radio size="small" 
                                                    sx={{
                                                        marginTop:"0px",
                                                        color: 'var(--primary)',
                                                        '&.Mui-checked': {color: 'var(--primary)',},
                                                    }}/>}  label="Mutation Postion" />
            </RadioGroup>
        </FormControl>
          
        </div>
        <div className='row' style={{width:"20%"}}>
          <FormControl fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": { },
              },
            }}>
            <InputLabel id="demo-simple-select-label">Segment</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              
            >
              <MenuItem value={10}>1 (PB2)</MenuItem>
              <MenuItem value={20}>2 (PB1)</MenuItem>
              <MenuItem value={30}>3 (PA)</MenuItem>
              <MenuItem value={20}>4 (HA)</MenuItem>
              <MenuItem value={30}>5 (NP)</MenuItem>
              <MenuItem value={20}>6 (NA)</MenuItem>
              <MenuItem value={30}>7 (M)</MenuItem>
              <MenuItem value={30}>8 (NS)</MenuItem>
            </Select>
          </FormControl>
        </div>

      </div>





      <div className="h-screen w-full !important">
        {/* <Taxonium backendUrl="https://api.cov2tree.org" />; */}
        {/* <Taxonium 
          sourceData={sourceData }
          // onNodeDetailsLoaded={handleNodeDetailsLoaded}
          title={"HELLO THIS IS A TEST"}
          // sidePanelHiddenByDefault={true}
          // onNodeSelect={(nodeId => {
          //       if (nodeId !== null) {
          //         alert(`Node selected: ${nodeId}`);
          //       } else {
          //         alert("Node deselected");
          //     }})}
          setOverlayContent={`<>
                  <span>
                    Hello
                  </span>{" "}
                  
                </>`}

                          /> */}
      </div>
      
      
      {/* <Taxonium
        tree={nwk}
        metadata={metadata_text}
        width={"100%"}
        height={"100%"}
      /> */}
    </div>
  );
};
 
export default Phylogeny;
