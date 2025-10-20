import { useEffect } from 'react';

const useJobPolling = (shouldPoll, jobId, onPoll) => {
  useEffect(() => {
    if (!shouldPoll || !jobId) return;

    onPoll(); // Run immediately
    const intervalId = setInterval(onPoll, 2000); // Then poll

    return () => clearInterval(intervalId); // Cleanup
  }, [shouldPoll, jobId]);
};

export default useJobPolling;
