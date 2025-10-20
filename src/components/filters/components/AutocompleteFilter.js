import React, { useState, useEffect } from 'react';
import { Autocomplete, Box, TextField, Divider, CircularProgress } from '@mui/material';

import useApiEndpoint from '../../../hooks/useApiEndpoint'

import '../../../assets/styles/filters.css'

const AutoCompleteFilter = ({label, url, idKey, handleId, exampleOptions}) => {

  const [ids, setIds] = useState([]) 

  const handleChange = (event, value) => {
    setSelectedOptions(value)
    handleId(`${value}`)
  }
  
  const { endpointData, isPending, error } = useApiEndpoint(url);

  useEffect(() => {
    if (endpointData.length != 0){
      setIds(endpointData)
    }

  }, [url, endpointData]);

  useEffect(() => {
    if (exampleOptions) {
      setSelectedOptions(exampleOptions);
    }
  }, [exampleOptions]);

  const [selectedOptions, setSelectedOptions] = useState(exampleOptions);

  return (
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
        <div className='col-3 filter-label'><h6 >{label} </h6></div>
        <Divider orientation="vertical" flexItem  />
        <div className='col-9'>
          <Autocomplete
            // disablePortal
            defaultValue={[]} // Pre-filled options
            value={selectedOptions}
            multiple
            size="small"
            onChange={handleChange}
            options={[... new Set(ids.map(x => x[idKey]))]}
            loading={isPending}
            renderInput={(params) => 
            <TextField variant="outlined"
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
              placeholder={`Enter ${label}`} />}
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
  );
};

export default AutoCompleteFilter;