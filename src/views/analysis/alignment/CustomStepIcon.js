import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material';

import '../../../assets/styles/fastaAnalysis.css'

export const steps = [
    {
      label: 'BLAST Search',
      description: `For your submitted sequences, RABV-gDB will perform a BLAST search against the reference
                    sequences in the RABV database. This will identify the best matching reference sequence to be 
                    used for alignment.`,
    },
    {
      label: 'MAFFT Alignment',
      description: `After identifying the best match sequence from the BLAST search, RABV-gDB runs MAFFT
                    for each submitted sequence to generate the final alignment.`,
    },

    {
      label: 'Phylogenetic Tree',
      description: `After identifying the best match sequence from the BLAST search, RABV-gDB runs MAFFT
                    for each submitted sequence to generate the final alignment.`,
    },
    
  ];

  const CustomStepIcon = ({ active, completed, index, currentStep, failed, jobFailed }) => {
    if (jobFailed) {
        return <FontAwesomeIcon icon={faCircleXmark} className="failure" />;
    }
    else if (failed && index == currentStep) {
        return <FontAwesomeIcon icon={faCircleXmark} className="failure" />;
    } else if (completed) {
      // Show checkmark when step is completed
      return <FontAwesomeIcon icon={faCheckCircle} className="success" />;
    } else if (failed) {
        return <FontAwesomeIcon icon={faCheckCircle} className="failure" />;
    } else if (index == currentStep) {
      // Show spinning wheel when the step is active
      return <CircularProgress size={24} sx={{color:"var(--secondary)"}}/>;
    } 
    else {
      // Placeholder for inactive steps
      return <div className='inactive-steps'></div>;
    }
    
  };

  export default CustomStepIcon;