import { useState, useEffect, useMemo } from 'react';
import { Autocomplete, Box, TextField, CircularProgress } from '@mui/material';

import '../../../assets/styles/filters.css'

// Debounce utility to throttle API calls
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SearchAutocomplete = ({label, url, idKey, handleId}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);


  // Memoize the debounced fetch function
  const fetchOptions = useMemo(
    () =>
      debounce(async (query) => {
        if (!query) return;
        if (query.length > 2){
        setLoading(true);
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${url}${query}`);
          const data = await res.json();
          setOptions(data || []); // adjust based on your API shape
        } catch (err) {
            
          console.error('Error fetching options:', err);
        } finally {
          setLoading(false);
        }
    }
      }, 300), // debounce delay
    []
  );

  useEffect(() => {
    if (inputValue) {
      fetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, fetchOptions]);

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
        <div className='col-9'>
          <Autocomplete
            multiple 
            size="small"
            options={options}
            getOptionLabel={(option) => option[idKey] || ''}
            loading={loading}
            filterOptions={(x) => x}
            onInputChange={(event, value) => setInputValue(value)}
            onChange={(e, value) => { handleId?.(value.map(v => v[idKey])); }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={`Enter ${label}`}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress size={18} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            sx={{
              "& .MuiOutlinedInput-root": {
                border: "none",
                "& fieldset": { border: "none"},
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default SearchAutocomplete;
