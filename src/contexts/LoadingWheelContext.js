// This is a React Context implementation to globally manage the visibility of a loading spinner or wheel.
import { createContext, useContext, useState } from 'react';

const LoadingWheelContext = createContext();

// This provider component wraps around any part of your app
// where you want the loading spinner logic to be accessible
export const LoadingWheelProvider = ({ children }) => {

  const [show, setShow] = useState(false);

  // This function will show or hide the spinner based on a boolean (true = show, false = hide).
  // You call this in your components where you're managing async state like fetching data.
  const triggerLoadingWheel = (isPending) => {
    setShow(isPending);
  };

// Provide the 'show' state and the trigger function to children components
  return (
    <LoadingWheelContext.Provider value={{ show, triggerLoadingWheel }}>
      {children}
    </LoadingWheelContext.Provider>
  );
};

// This custom hook makes it easy to access the loading wheel context
// from any component inside the provider's tree
export const useLoadingWheelHandler = () => {
  return useContext(LoadingWheelContext);
};


