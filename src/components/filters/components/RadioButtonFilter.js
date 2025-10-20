import { Radio, RadioGroup, FormControl, FormControlLabel, Box } from '@mui/material';


import '../../../assets/styles/filters.css'
const RadioButtonFilter = ({label, label_values, value, handleId}) => {

    const handleChange = (value) => {
        handleId(`${value}`)
    }

    return (
        <div className='filter-container'>
              <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'white',
                  }}
                  >
                    {label && <div className='col-3 filter-label radio'><h6 >{label} </h6></div>}
                    <div className='col-9'>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={e => handleChange(e.target.value)}  
                            >
                                <FormControlLabel value={value[0]} 
                                
                                                    control={<Radio size="small" 
                                                                    sx={{
                                                                        color: 'var(--primary)',
                                                                        '&.Mui-checked': {color: 'var(--primary)',},
                                                                    }}/>} 
                                                                    label={label_values[0]} />
                                <FormControlLabel value={value[1]} 
                                                    control={<Radio size="small" 
                                                                    sx={{
                                                                        color: 'var(--primary)',
                                                                        '&.Mui-checked': {color: 'var(--primary)',},
                                                                    }}/>}  label={label_values[1]} />
                            </RadioGroup>
                        </FormControl>
                      </div>
                  </Box>
              </div>
        
  );
};

export default RadioButtonFilter;
