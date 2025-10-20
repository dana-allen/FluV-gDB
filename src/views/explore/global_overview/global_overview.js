import { useRef, useState, useCallback } from "react"
import { Tooltip as ReactTooltip } from "react-tooltip"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { toPng } from 'html-to-image';
import GlobalMap from "./GlobalMap"
import { useApiEndpoint, useFilterParams, useDownload } from "../../../hooks"
import SequencesFilter from "../../../components/filters/SequencesFilter"
import CladeTree from '../../../components/trees/CladeTree';


const GlobalOverview = ({ filters = null }) => {
  const mapRef = useRef(null);
  const [params, setParams] = useFilterParams(filters)
  const [showFilter, setShowFilter] = useState(false)
  const [content, setContent] = useState("")
  const [country, setCountry] = useState("")

  // API call (re-runs automatically when `params` changes)
  const url = "/api/statistics/get_global_distribution_of_sequences/"
  const { endpointData: data, isPending, endpointError } = useApiEndpoint(url, params)
  const { downloadFile } = useDownload();

  // When filters are applied, just update params -> triggers hook
  const handleFiltersChange = useCallback((newFilters) => {
    setParams(newFilters)
    setShowFilter(false)
  }, [setParams])

  const downloadMapAsPNG = (mapRef) => {
    if (!mapRef.current) return;
    toPng(mapRef.current, { backgroundColor: '#fff', cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        downloadFile(dataUrl, "map-with-legend.png", "png");
      })
      .catch((err) => {
          console.error('Failed to export map:', err);
    });
  };

  return (
    <div className="container">
      <h2>Global Sequences Overview</h2>

      <div className="row">
        <div className='col-9'>
          <div className='tree-wrapper'>
            <div ref={mapRef}>
              <GlobalMap
                data={data || []}
                setTooltipContent={setContent}
                countryClicked={setCountry}
              />
            </div>
          </div>
        </div>

        <div className='col-3'>
          <div><CladeTree onCladeSelect={handleFiltersChange}/></div>
          <div className="col right-align" >
            <Button className="btn-main-filled " style={{"margin-right": '2px'}} onClick={() => setShowFilter(true)}> Filters </Button>
            <Button className='btn-main-filled float-right' onClick={() => downloadMapAsPNG(mapRef)}>Download Map</Button>
          </div>

          {country && 
            <div style={{ marginTop:'5px'}}>
              <h3>{country}</h3>
              <p>filler on stats about the sequences</p>
              <Link to="/sequences" state={{ filters: { ...params, country } }}><Button className="btn-main-filled " size='sm'> Explore sequences </Button></Link>
              {/* <p> */}
                {/* Explore sequences for:{" "} */}
                {/* <Link className="custom-link" to="/sequences" state={{ filters: { ...params, country } }} > {country} </Link> */}
                
              {/* </p> */}
            </div> 
          }
        </div>
      </div>
      <ReactTooltip id="map-tooltip">{content}</ReactTooltip>
      <SequencesFilter
        show={showFilter}
        onFilterSelect={handleFiltersChange}
        onClose={() => setShowFilter(false)}
      />
    </div>
  )
}

export default GlobalOverview
