import { Box, TextField, Divider} from '@mui/material';
import '../../../assets/styles/filters.css';

const RangeFilter = ({label, handleLower, handleUpper}) => {

    const handleLowerChange = (event) => {handleLower(`${event.target.value}`)}
    const handleUpperChange = (event) => {handleUpper(`${event.target.value}`)}
    

  return (
    <div className='filter-container'>
        <Box sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
                height:'100%'
            }}>
                <div className='col-3 filter-label'> <h6>{label}</h6> </div>

                <div className='col-4' >
                    <TextField 
                        size="small" 
                        margin="none" 
                        type="number" 
                        fullWidth
                        placeholder="Enter lower" 
                        variant="outlined"
                        onChange={handleLowerChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "none",
                                "& fieldset": { border: "none" }
                            }
                        }}>
                    </TextField>
                </div>

                
                <Divider orientation="vertical" flexItem />
                <div className='col-1 filter-label' ><h6>to</h6></div>
                <Divider orientation="vertical" flexItem />
                <div className='col-4' >
                    <TextField 
                        size="small" 
                        margin="none" 
                        type="number" 
                        placeholder="Enter Upper" 
                        variant="outlined"
                        fullWidth
                        onChange={handleUpperChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                border: "none",
                                "& fieldset": { border: "none" }
                            }
                        }}>
                    </TextField>
                </div>
          </Box>
    </div>

  );
};

export default RangeFilter;