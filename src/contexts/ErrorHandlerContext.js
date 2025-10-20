// contexts/ErrorHandlerContext.js
import { createContext, useContext, useState } from 'react';

const ErrorHandlerContext = createContext();

export const ErrorHandlerProvider = ({ children }) => {
  
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const triggerError = (err) => {
    setError(err);
    setShowError(true);
  };

  const clearError = () => {
    setError(null);
    setShowError(false);
  };

  return (
    <ErrorHandlerContext.Provider value={{ error, showError, triggerError, clearError }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export const useErrorHandler = () => {
  return useContext(ErrorHandlerContext);
};
