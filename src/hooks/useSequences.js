import useFetch from "./useFetch";

function useSequences(params) {
    
    const query_params = new URLSearchParams(params).toString();
    const url = `${process.env.REACT_APP_BACKEND_URL}${'/api/sequences/'}${query_params ? `?${query_params}` : ''}`;
    const { data, ...rest } = useFetch(url);
    const sequences = data ? data["data"] : null
    const nextCursor = data ? data["next_cursor"] : 0
    const prevCursor = data ? data["prev_cursor"] : 0
    const totalCount = data ? data["total_count"] : 0

    return { sequences, nextCursor, prevCursor, totalCount, ...rest };

};

export default useSequences;