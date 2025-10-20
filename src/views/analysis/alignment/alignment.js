import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import Typography from '@mui/material/Typography';

// import { useJobPolling } from '@centre-for-virus-research/gdb-core-package'

import AlignmentSubmission from "./AlignmentSubmission";
import AlignmentResults from "./AlignmentResults";
import BlastResults from "./BlastResults";
import submitApiQuery from '../../../callbacks/submitApiQuery';
import {steps, CustomStepIcon} from "./CustomStepIcon";

import { useJobPolling } from "../../../hooks"

const Alignment = () => {

    // GUI components -- step counter
    const [activeStep, setActiveStep] = React.useState(null);
    const [currentStep, setCurrentStep] = useState(null)
    const handleStepClick = (stepIndex) => {
        if(stepIndex === activeStep){
            setActiveStep(3)
        } else {
            setActiveStep(stepIndex)
        }
        
    };
    
    const [blastFailed, setBlastFailed] = React.useState(false);
    const [jobId, setJobId] = useState('');
    const [isPolling, setIsPolling] = useState(true);
    const [status, setStatus] = useState(''); //TODO: CAN I DELETE THIS??????

    const [jobSubmitted, setJobSubmitted] = useState(false)

    const [jobCreationError, setJobCreationError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [blastResults, setBlastResults] = useState(null);


    useJobPolling(isPolling, jobId, () => fetchJobStatus(jobId, handleJobStatus));

    const submitJob = (data) => {
        const queryString = new URLSearchParams({query:encodeURIComponent(data)}).toString();
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}/api/tasks/run_sequence_alignment/`;
        submitApiQuery(fullUrl, queryString, handleSubmittedJob)
    }

    const fetchJobStatus = () => {
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}/api/tasks/get_job_logs/${jobId}`;
        submitApiQuery(fullUrl, false, handleJobStatus)
    }

    const fetchBlastResults = () => {
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}/api/tasks/get_blast_results/${jobId}`;
        submitApiQuery(fullUrl, false, handleBlastResults)
    }

    const fetchAlignmentResults = () => {
        console.log("here")
        console.log(jobId)
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}/api/tasks/get_alignment_results/${jobId}`;
        submitApiQuery(fullUrl, false, handleAlignmentResults)
    }


    // Callbacks to handle API request data return
    const handleSubmittedJob = async (data) => {
        setCurrentStep(0);
        if (data.status === 200){
            const json = await data.json();  
            setJobId(json)
            setJobSubmitted(true)
            
        } else {
            setJobCreationError(true)
            setJobSubmitted(false)
        }
        
    }

    const handleJobStatus = async (data) => {
        const response = await data.json()
        if (response.status.message === "done") {
            setIsPolling(false); // Stop polling
        } else if (response.status.message === 'failed'){
            setErrorMessage("FAILED")
            setJobCreationError(true)
            setJobSubmitted(false)
            setIsPolling(false);
        } else if (response.status.blast === 'done') {
            setCurrentStep(1)
            fetchBlastResults()
        } 
        else if (response.status === 'blast failed') {
            setIsPolling(false)
            setCurrentStep(0)
            setBlastFailed(true)

        } else if (response.status.alignment === 'done') {
            setCurrentStep(2)
            // fetchAlignmentResults()

        } else if (response.status.alignment === 'failed') {
            // setNextAlignFailed(true)

        } 
        if (response.status.message === 'done') {
            setCurrentStep(3)
            fetchAlignmentResults()
        }

    }

    
    const handleBlastResults = async (data) => {
        if (data.status === 200){
            // const blobText = await (await res.blob()).text()
            // setBlastResults(blobText)
        } 
    }


    const [alignmentResults, setAlignmentResults] = useState([])
    const handleAlignmentResults = async (data) => {
        if (data.status === 200){
            const json = await data.json();  
            setAlignmentResults(json)

        } 
    }

    
    useEffect(() => {
        if (isPolling && jobId) {
            fetchJobStatus(); // Fetch logs immediately
            const intervalId = setInterval(fetchJobStatus, 2000); // Fetch every 2 seconds
            return () => clearInterval(intervalId); // Cleanup interval on unmount
        }
    }, [isPolling, jobId]); // Rerun effect if jobId changes

    return (
        <div className='container'>
            <div className='row'>
                <h2>{process.env.REACT_APP_FASTA_ANALYSIS_NAME}</h2>
                <p>
                    Submit your sequence files in FASTA nucleotide format for automated
                    alignment and clade assignment against the {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}&nbsp;
                    database.
                </p>
                <hr></hr>
                    <div>

                    {jobCreationError &&
                        <div className="db-status failure" style={{'margin-bottom':'10px'}}><p>{errorMessage}</p></div>
                    }

                    <AlignmentSubmission jobSubmitted={submitJob}/>
                    <br></br>
                    <br></br>
                    {/* {jobSubmitted && !jobCreationError &&
                        <div>
                            <hr></hr>
                            <Box>
                                <Stepper activeStep={activeStep} orientation="vertical" >
                                    {steps.map((step, index) => (
                                        <Step key={step.label}>
                                            <StepLabel
                                                StepIconComponent={(props) => (
                                                <CustomStepIcon {...props} index={index} completed={index < currentStep} currentStep={currentStep} failed={blastFailed} jobFailed={jobCreationError}/>
                                                )}
                                                onClick={() => handleStepClick(index)} // Handle StepLabel click
                                            >
                                                <h3>{step.label}&nbsp; <Button style={{margin:'0px', padding:'0px', border:'none', backgroundColor:'white', color:"var(--secondary)"}}> {activeStep === index ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}</Button> {activeStep === index && status}</h3>
                                                
                                            </StepLabel>
                                            <StepContent>
                                                {index == 0 &&

                                                    <Typography>
                                                        <p>{step.description}</p>
                                                        {currentStep > 0 && <BlastResults data={blastResults}/>}
                                                    </Typography>
                                                }
                                                {index == 1 &&
                                                    <Typography>
                                                        <p>{step.description}</p>
                                                        <div>
                                                            {currentStep > 1 && alignmentResults && <AlignmentResults data={alignmentResults}/>}

                                                        </div>
                                                    </Typography>
                                                }
                                            </StepContent>
                        
                                        </Step>
                                    ))}
                                </Stepper>
                    
                            </Box>
                        </div>
                    } */}
                </div>
            </div>
        </div>
       
    );
};
 
export default Alignment;

