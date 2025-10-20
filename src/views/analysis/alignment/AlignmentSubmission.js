import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { FormControl, TextField } from '@mui/material';

import '../../../assets/styles/fastaAnalysis.css'

const AlignmentSubmission = ({jobSubmitted}) => {


    const [sequence, setSequence] = useState('');
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            var tmpFiles = [...files]
            tmpFiles.push(e.target.files[0])
            setFiles(tmpFiles);
        }
    };

    const handleResetButton = () => {
        setSequence('')
        setFiles([])
    }

    const updateSequence = (event) => { setSequence(event.target.value); }

    const handleLoadExampleButton = async () => {
        const filePath = "/examples/seqAlign.txt"; // Path inside 'public' folder
    
        try {
            const response = await fetch(filePath);
            const text = await response.text();
            setSequence(text); // Store the text in state
        } catch (error) {
            console.error("Error loading file:", error);
        }
    };

    const handleSubmitButton = () => {jobSubmitted(sequence)}

    
    return (
        <div>
            <h4>Sequence(s) Submission</h4>
            <div className='row input-container'>
                <div className='col-2'><p><b>Enter query sequence(s)</b></p></div>
                <div className='col-7'>
                    <FormControl fullWidth >
                        <TextField 
                            value={sequence}
                            size="small" 
                            margin="none" 
                            fullWidth
                            placeholder="paste sequence" 
                            multiline // Enables multi-line input
                            rows={6} // Set to desired number of rows
                            variant="outlined"
                            InputProps={{
                                style: { fontSize: '12px' },  // Change font size here
                            }}
                            onChange={updateSequence}>
                        </TextField>
                    </FormControl>
                </div>
            </div>
        
            <div className='row'> 
                <div className='col-2'>
                    <p><b>or, upload FASTA file</b></p>
                </div>
                <div className='col-9'>
                    <input type="file" onChange={handleFileChange} />
                </div>
        
        
            </div>
            <div>
            <Button className='btn-main-filled' size="sm" onClick={() => handleResetButton()}>Reset</Button>
            </div>
            <div className='float-right'>

            <Button className='btn-main-filled example-btn' onClick={() => handleLoadExampleButton()}>Load Example</Button>
            <Button className='btn-main-filled' disabled={!sequence} onClick={() => handleSubmitButton()} >Submit</Button>
            </div>
        </div>
    )

}

export default AlignmentSubmission;