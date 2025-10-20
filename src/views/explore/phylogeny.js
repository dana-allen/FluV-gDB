import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowsH,faDownLeftAndUpRightToCenter} from '@fortawesome/free-solid-svg-icons'

// Custom Components
import { highlightTipPath, highlightAnnotationsPath, reset } from "../../components/phlogeny_tree/phylogeny_main.js";
import { main } from '../../assets/javascript/phylo_tree_builder.js';

// Javascript imports
import '../../components/phlogeny_tree/phylogeny_main.js'

// Style imports
import '../../assets/styles/phylotree.css'
import '../../assets/styles/phylogeny.css'

const Phylogeny = () => {

  const [accessionQuery, setAccessionQuery] = useState("");
  const [hostQuery, setHostQuery] = useState("");
  const [countryQuery, setCountryQuery] = useState("");

  const handleAccessionChange = (e) => { setAccessionQuery(e.target.value); };

  const handleHostChange = (e) => { setHostQuery(e.target.value); };
  const handleCountryChange = (e) => { setCountryQuery(e.target.value); };

  const handleTipHighlight = (e) => { highlightTipPath(e) };

  const handleHost = (e) => { highlightAnnotationsPath(e, "host") };
  const handleCountry = (e) => { highlightAnnotationsPath(e, "country")}

  const handleReset = () => {
    reset()
    setHostQuery('')
    setCountryQuery('')
    setAccessionQuery('')
  }

  const test_click = () => {
    main()
  }

    
  return (
    <div className='container'>
      <h2>Phylogeny Tree</h2>

      {/* <button onClick={test_click}> Build the tree </button> */}


      {/* Horizontal Buttons */}
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-light btn-sm btn-main-filled"
          data-direction="horizontal"
          data-amount="1"
          title="Expand horizonal spacing"
        >
          <FontAwesomeIcon icon={faArrowsH} />
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm btn-main-filled"
          data-direction="horizontal"
          data-amount="-1"
          title="Compress horizonal spacing"
        >
          <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} className="rotate-45"/>
        </button>
      </div>
      {/* Horizontal Buttons - END */}

      {/* Vertical Buttons */}
      <div className="btn-group ms-2">
        <button
          type="button"
          className="btn btn-light btn-sm btn-main-filled"
          data-direction="vertical"
          data-amount="1"
          title="Expand vertical spacing"
        >
          <FontAwesomeIcon icon={faArrowsH} className='rotate-90'/>
        </button>
        <button
          type="button"
          className="btn btn-light btn-sm btn-main-filled"
          data-direction="vertical"
          data-amount="-1"
          title="Compress vertical spacing"
        >
          <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} className='rotate-135'/>
        </button>
      </div>
      {/* Vertical Buttons - END */}


      <div className='tree-box'>
        <div className="row">
          <div className='col-9'>
            <div className='tree-wrapper' id="tree-wrapper">
              <div id="tree_container"></div>
            </div>
          </div>
            
          <div className='col-3'>
            <div className='selection-box'>
              <p >Select to expand phylogeny tree:</p>
              <div id="selection_name_dropdown" /> {/* THIS LINE IS THE CHECKBOX LIST -- BUILT IN JAVASCRIPT */}
              <br></br>
              <div className='search-box'>

                <h4>Search:</h4>

                <div className='search-input'>
                  <input
                    className='search-label'
                    type="text"
                    value={accessionQuery}
                    onChange={handleAccessionChange}
                    placeholder="Search primary accession..."
                  />
                  <button
                    className='search-btn'
                    onClick={() => handleTipHighlight(accessionQuery)}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>

                {/* Second search input */}
                <div className='search-input'>
                  <input
                    className='search-label'
                    type="text"
                    value={hostQuery}
                    onChange={handleHostChange}
                    placeholder="Search by host..."
                  />
                  <button
                    className='search-btn'
                    onClick={() => handleHost(hostQuery)}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>

                {/* Third search input */}
                <div className='search-input'>
                  <input
                    className='search-label'
                    type="text"
                    value={countryQuery}
                    onChange={handleCountryChange}
                    placeholder="Search by country..."
                  
                  />
                  <button
                    className='search-btn'
                    onClick={() => handleCountry(countryQuery)}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>

                <div className='reset-row'>
                  <button
                      className='reset-btn'
                      onClick={() => handleReset()}
                    > Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Phylogeny;
