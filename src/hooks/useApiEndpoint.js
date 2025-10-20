import { useState, useEffect } from 'react';



/**
 * Custom hook to fetch data from an API endpoint using Axios.
 * 
 * @function
 * @param {string} url - The API endpoint URL path to fetch data from.
 * @param {object} [params={}] - Optional parameters to include in the request query string.
 * @returns {object} - Returns an object containing:
 *                     - `endpointData`: The data retrieved from the API, initially an empty array.
 *                     - `isPending`: A boolean indicating whether the request is in progress.
 *                     - `endpointError`: An error object if the request fails, or `null` if successful.
 * 
 * @example
 * const { endpointData, isPending, endpointError } = useApiEndpoint("/example-path", { key: "value" });
 * 
 * @description
 * - Sets up a pending state before making the request, showing `isPending` as `true` until the request completes.
 * - On successful response, updates `endpointData` with the retrieved data and clears any errors.
 * - If the request fails, captures and sets an error in `endpointError`.
 * - Dependency on `url` and serialized `params` ensures that the effect runs when these change.
 */
function useApiEndpoint(url, params = {}) {
    
    const [endpointData, setEndpointData] = useState([]);
    const [endpointError, setEndpointError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    
    useEffect(() => {
        setIsPending(true);
        setEndpointData([])

         // Convert params object to query string
         const queryString = new URLSearchParams(params).toString();
         const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${url}${queryString ? `?${queryString}` : ''}`;
          console.log(fullUrl)
         fetch(fullUrl, {
            headers: { 'database': process.env.REACT_APP_DATABASE },
          })
            .then(async (response) => {
              if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                const error = new Error(errorBody.message || 'Unknown error');
                error.status = response.status;
                error.details = errorBody;
                throw error;
              }
              return response.json();
            })
            .then((data) => {
              setIsPending(false);
              setEndpointData(data);
              setEndpointError(null);
            })
            .catch((error) => {
              console.error('Caught error:', error);
              setIsPending(false);
              setEndpointError({
                endpoint: fullUrl,
                message: error.message || 'Unknown error',
                status: error.status || null,
                details: error.details || null,
              });
            });
      
    
    }, [url, JSON.stringify(params)]);

    return {endpointData, isPending, endpointError};
  }




export default useApiEndpoint;