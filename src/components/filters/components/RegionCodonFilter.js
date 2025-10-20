import React, {useState, useEffect} from 'react';
import { Autocomplete, Box, TextField, CircularProgress } from '@mui/material';

import useApiEndpoint from '../../../hooks/useApiEndpoint';

import '../../../assets/styles/filters.css';

const RegionCodonFilter = ({url, handleRegion, handleCodon, regionExample, codonExample}) => {

    const [ids, setIds] = useState([]) 
    const [codons, setCodons] = useState([])

    const handleRegionChange = (event, value) => {

      if(value != ""){

        const filteredFeatures = endpointData.filter(feature => {
                                                                const values = Array.isArray(value) ? value : [value];
                                                                return values.includes(feature.product);
                                                              });
      if (filteredFeatures.length > 0) {
        const minCodonStart = Math.min(...filteredFeatures.map(f => f.codon_start));
        const maxCodonEnd = Math.max(...filteredFeatures.map(f => f.codon_end));
        setCodons(Array.from({ length: maxCodonEnd - minCodonStart + 1 }, (_, i) => minCodonStart + i));
      } else {
        // handle case where no features matched
        setCodons([]);
      }
      handleRegion(`${value}`)
      setRegionOptions(value)
     
    }
  }
    const [regionOptions, setRegionOptions] = useState([])
    const [codonOptions, setCodonOptions] = useState([])

    useEffect(() => {
      setRegionOptions(regionExample)
      setCodonOptions(codonExample)
    }, [regionExample, codonExample]);
  
    
    
    const handleCodonChange = (event, value) => {
      handleCodon(`${value}`)
      setCodonOptions(value)
    }
    
    const { endpointData, isPending, error } = useApiEndpoint(url);

    useEffect(() => {

      if (endpointData.length != 0){

        setIds([...new Set(endpointData.map((d) => d.product))])
      }
 
    }, [url, endpointData]);


  return (
    <div>
      <div className='filter-container'>
        <Box
          sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper',
            }}
            >
            <div className='col-3 filter-label'><h6 >Region </h6></div>
            <div className='col-9'>
              <Autocomplete
              // disablePortal

              multiple
              size="small"
              defaultValue={[]} // Pre-filled options
              value={regionOptions}
              onChange={handleRegionChange}
              options={[... new Set(ids.map(x => x))]}
              loading={isPending}
              renderInput={(params) => <TextField variant="outlined"
              {...params}  
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isPending ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
              placeholder={`Enter region`} />}
              sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none", // Remove the border
                    "& fieldset": {
                      border: "none", // Remove the fieldset (underline/box)
                    },
                  },
                }}
              />
          </div>
        </Box>
      </div>
      <div className='filter-container'>
        <Box
          sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper',
            }}
        >
          <div className='col-3 filter-label'><h6>Codon </h6></div>
          <div className='col-9'>
            <Autocomplete
              multiple
              size="small"
              defaultValue={[]} // Pre-filled options
              value={codonOptions}
              onChange={handleCodonChange}
              
              options={[... new Set(codons.map(x => x.toString()))]}
              loading={isPending}
              renderInput={(params) => <TextField variant="outlined"
              {...params}  
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isPending ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
              placeholder={`Enter codon`} />}
              sx={{
                  "& .MuiOutlinedInput-root": {
                    border: "none", // Remove the border
                    "& fieldset": {
                      border: "none", // Remove the fieldset (underline/box)
                    },
                  },
                }}
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default RegionCodonFilter;