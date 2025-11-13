import useFetch from "./useFetch";


function groupByIsolate(data) {
    let grouped = {};
    const item = data[0]
    grouped = {
                isolate: item.isolate,
                host: item.host_validated || item.host || "-",
                isolation_source: item.isolation_source,
                country: item.country_validated || item.country || "-",
                collection_date: item.collection_date,
                strain: item.strain
            };

    // Convert object to array for mapping in JSX
    return grouped;
}


function useGetIsolate(decodedID) {
    
    const endcodedID = encodeURIComponent(decodedID);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/sequence/strain/${endcodedID}`;
    console.log(url)
    const { data, ...rest } = useFetch(decodedID ? url : null);
    const isolates = data ? data : [];
    console.log(data)
    const {
        meta_data,
        segments
    } = data|| {};

    const pubmedId = meta_data?.pubmed_id;
    const isolate =data ? groupByIsolate(data) : {};


    return { data: isolate, pubmedId, segments: data, ...rest };

};

export default useGetIsolate;