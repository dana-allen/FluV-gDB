import { useState, memo, useEffect } from "react"
import Map from './Map';
import { parseCountryData, parseSequenceCounts } from "../../../utils/mapHelper";


const GlobalMap = ({ data, setTooltipContent, countryClicked }) => {

    const [countryCounts, setCountryCounts] = useState({});
    const [maxCount, setMaxCount] = useState(0);
    const [minCount, setMinCount] = useState(0);


    useEffect(() => {

        if (data.length != 0){
            console.log(data)
            const countryCounts = parseSequenceCounts(data);
            console.log(countryCounts)
            const countryData = parseCountryData(data);
            setCountryCounts(countryData);
            setMaxCount(countryCounts["max"]);
            setMinCount(countryCounts["min"])
                
        }
    }, [data]);

            
  return (
        <Map setTooltipContent={setTooltipContent} countryCounts={countryCounts} maxCount={maxCount} minCount={minCount} countryClicked={countryClicked}></Map>
    )

}
export default memo(GlobalMap);
