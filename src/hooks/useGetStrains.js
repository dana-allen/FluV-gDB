import useFetch from "./useFetch";

function useGetStrains(params = {}) {
    
    const queryString = new URLSearchParams(params).toString();
    const url = `${process.env.REACT_APP_BACKEND_URL}${'/api/strains/'}${queryString ? `?${queryString}` : ''}`;
    const { data, ...rest } = useFetch(url);
    const isolates = data ? data : [];
    return { data: isolates, ...rest };;

}

export default useGetStrains;