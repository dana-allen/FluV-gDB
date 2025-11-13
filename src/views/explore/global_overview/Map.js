import { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { scaleLinear } from "d3-scale";

const geoUrl = "/land-50m.json"

const Map = ({ setTooltipContent, countryCounts, maxCount, minCount, countryClicked}) => {

    const displaySequenceCount = (geography) => {
        if (countryCounts[geography.id] != undefined) {
            return countryCounts[geography.id].count
        } else {
            return 0;
        }
    }
    const colorScale = scaleLinear()
        .domain([minCount, maxCount])
        .range(["#e9f4f7", "#4CAF50"])
        
    const [selectedCountry, setSelectedCountry] = useState()
    const handleClick = (e) => {
        countryClicked(e.properties.name)
        setSelectedCountry(e.properties.name)
    }
    
    return (
        <div>
            <div>
                {/* Legend */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: -50, marginTop:10 }}>
                    <p style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 12,
                        color: '#333'
                    }}>Sequence Count &nbsp;</p>
                    <div style={{ width: 300 }}>
                        
                        <div style={{
                            height: 15,
                            background: `linear-gradient(to right, ${colorScale(minCount)}, ${colorScale(maxCount)})`,
                            borderRadius: 4
                        }} />
                        
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: 12,
                                color: '#333',
                                marginTop: 5
                            }}>
                                
                                <span>{minCount}</span>
                                <span>{Math.round((minCount + maxCount) / 2)}</span>
                                <span>{maxCount}</span>
                            </div>
                    </div>
                </div>
                <div >
                <ComposableMap>
                    <ZoomableGroup>
                        <Geographies geography={geoUrl} >
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isSelected = geo.properties.name === selectedCountry;
                                    return(
                                    <Geography key={geo.rsmKey} 
                                                geography={geo} 
                                                data-tooltip-id="map-tooltip"
                                                onClick={()=> handleClick(geo)}
                                                onMouseEnter={() => { setTooltipContent(`${geo.properties.name}: ${displaySequenceCount(geo)}`); }}
                                                style={{
                                                    default: {
                                                        fill: isSelected
                                                            ? "var(--primary)" // color for selected country
                                                            : Object.keys(countryCounts).includes(geo.id)
                                                            ? colorScale(countryCounts[geo.id].count)
                                                            : "#D6D6DA",
                                                        // fill: Object.keys(countryCounts).includes(geo.id) ? colorScale(countryCounts[geo.id].count) : "#D6D6DA", // Highlight color for countries in the list
                                                        outline: "none",
                                                        border:"solid"
                                                    },
                                                    hover: {
                                                        fill: "var(--primary)", // Color when hovered
                                                        outline: "none"
                                                    }
                                                }}/>)
                                    })}
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>   
                </div>
            </div>

        </div>
    )

}
export default Map;