import React, { useState, useEffect } from "react"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material"

import {
  useJobPolling,
  AlignmentSubmission,
  submitApiQuery,
  BlastResults,
  AlignmentResults,
  steps,
  CustomStepIcon,
} from "@centre-for-virus-research/gdb-core-package"

const Alignment = () => {
  const [activeStep, setActiveStep] = useState(null)
  const [currentStep, setCurrentStep] = useState(null)
  const [jobId, setJobId] = useState("")
  const [isPolling, setIsPolling] = useState(false)

  const [blastResults, setBlastResults] = useState(null)
  const [alignmentResults, setAlignmentResults] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  // 🔹 helper to call API and handle response
  const apiCall = async (endpoint, handler) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}${endpoint}`
    submitApiQuery(url, false, handler)
  }

  // 🔹 submit new job
  const submitJob = (data) => {
    const query = new URLSearchParams({ query: encodeURIComponent(data) }).toString()
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/tasks/run_sequence_alignment/`
    submitApiQuery(url, query, handleSubmittedJob)
  }

  // 🔹 callbacks
  const handleSubmittedJob = async (res) => {
    setCurrentStep(0)
    if (res.status === 200) {
      const json = await res.json()
      setJobId(json)
      setIsPolling(true)
    } else {
      setErrorMessage("Job submission failed.")
    }
  }

  const handleJobStatus = async (res) => {
    const response = await res.json()
    const { status } = response

    if (status.message === "done") {
      setIsPolling(false)
      setCurrentStep(3)
      apiCall(`/api/tasks/get_alignment_results/${jobId}`, handleAlignmentResults)
    } else if (status.message === "failed") {
      setErrorMessage("Job failed.")
      setIsPolling(false)
    } else if (status.blast === "done") {
      setCurrentStep(1)
      apiCall(`/api/tasks/get_blast_results/${jobId}`, handleBlastResults)
    } else if (status.alignment === "done") {
      setCurrentStep(2)
    }
  }

  const handleBlastResults = async (res) => {
    if (res.status === 200) {
      const blobText = await (await res.blob()).text()
      setBlastResults(blobText)
    }
  }

  const handleAlignmentResults = async (res) => {
    if (res.status === 200) {
      setAlignmentResults(await res.json())
    }
  }

  // 🔹 Polling
  useEffect(() => {
    if (!isPolling || !jobId) return
    const tick = () => apiCall(`/api/tasks/get_job_logs/${jobId}`, handleJobStatus)
    tick()
    const id = setInterval(tick, 2000)
    return () => clearInterval(id)
  }, [isPolling, jobId])

  return (
    <div className="container">
      <div className="row">
        <h2>Sequence Alignment</h2>
        <p>
          Submit your sequence files in FASTA nucleotide format for automated
          alignment and clade assignment against the{" "}
          {process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE}
          &nbsp;database.
        </p>
        <hr />

        {errorMessage && (
          <div className="db-status failure mb-2">
            <p>{errorMessage}</p>
          </div>
        )}

        <AlignmentSubmission jobSubmitted={submitJob} />

        {jobId && !errorMessage && (
          <Box mt={4}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={(props) => (
                      <CustomStepIcon
                        {...props}
                        index={index}
                        completed={index < currentStep}
                        currentStep={currentStep}
                        failed={!!errorMessage}
                      />
                    )}
                    onClick={() =>
                      setActiveStep(activeStep === index ? null : index)
                    }
                  >
                    <h3>
                      {step.label}{" "}
                      <Button
                        style={{
                          margin: 0,
                          padding: 0,
                          border: "none",
                          background: "white",
                          color: "var(--secondary)",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={activeStep === index ? faCaretUp : faCaretDown}
                        />
                      </Button>
                    </h3>
                  </StepLabel>
                  <StepContent>
                    <Typography>
                      <p>{step.description}</p>
                      {index === 0 && currentStep > 0 && (
                        <BlastResults data={blastResults} />
                      )}
                      {index === 1 && currentStep > 1 && (
                        <AlignmentResults data={alignmentResults} />
                      )}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
      </div>
    </div>
  )
}

export default Alignment
