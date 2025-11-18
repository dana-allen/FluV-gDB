import useFetch from "./useFetch";


function useAdaptiveMutations() {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/adaptive_mutations/`;
    const { data, ...rest } = useFetch(url);


    return {mutations: data, ...rest };

};

export default useAdaptiveMutations;