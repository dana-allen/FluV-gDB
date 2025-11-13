import useFetch from "./useFetch";
import { parseCountryData, parseSequenceCounts } from "../utils/mapHelper";

function useMap() {
    
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/statistics/get_global_distribution_of_sequences/`;

    const { data, ...rest } = useFetch(url);
    const countryCounts = data ? parseSequenceCounts(data) : [];
    const countryData = data ? parseCountryData(data) : [];
    const maxCount = countryCounts ? countryCounts["max"] : null
    const minCount = countryCounts ? countryCounts["min"] : null

    return { countryData, maxCount, minCount, ...rest };

};

export default useMap;