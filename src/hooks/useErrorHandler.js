import { useState } from 'react';

const useErrorHandler = () => {

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);

  const triggerError = (err) => {
    if (err){
        setError(err);
        setShowError(true);
    }
  };

  const closeError = () => setShowError(false);
  
  return {
    showError,
    error,
    triggerError,
    closeError,
  };
};

export default useErrorHandler;