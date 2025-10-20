import { Button, Modal } from 'react-bootstrap';
import RangeFilter from './components/RangeFilter';
import AutoCompleteFilter from './components/AutocompleteFilter';
import SearchAutocomplete from './components/SeachAutocomplete';
import RadioButtonFilter from './components/RadioButtonFilter';

import '../../assets/styles/filters.css'
const SequencesFilter = ({ show, onFilterSelect, onClose }) => {

  var filters = {}

  const handleIsolateId =         (value) => { value != '' ? filters["isolate"] =             value : delete filters["isolate"] } 
  const handleNucleotideId =      (value) => { value != '' ? filters["primary_accession"] =   value : delete filters["primary_accession"] }
  const handlePubmedId =          (value) => { value != '' ? filters["pubmed_id"] =           value : delete filters["pubmed_id"] }
  const handleHostSpecies =       (value) => { value != '' ? filters["host"] =                value : delete filters["host"] }
  const handleCountry =          (value) => { value != '' ? filters["country"] =             value : delete filters["country"] }
  const handleRegion =          (value) => { value != '' ? filters["region"] =             value : delete filters["region"] }

  const handleLowerLengthChange =   (value) => { value != '' ? filters["length_lower"] =       value : delete filters["gb_length_lower"] }
  const handleUpperLengthChange =   (value) => { value != '' ? filters["length_upper"] =       value : delete filters["gb_length_upper"] }
  const handleEarliestChange =      (value) => { value != '' ? filters["collection_year_lower"] = value : delete filters["collection_year_lower"] }
  const handleLatestChange =        (value) => { value != '' ? filters["collection_year_upper"] = value : delete filters["collection_year_upper"] }


  const handleCreationLowerChange = (event) => { event.target.value != '' ? filters["creation_year_lower"] =   event.target.value : delete filters["creation_year_lower"] }
  const handleCreationUpperChange = (event) => { event.target.value != '' ? filters["creation_year_upper"] =   event.target.value : delete filters["creation_year_upper"] }

  const handleExclusion = (value) => {value != '' ? filters["exclusion_status"] = value : delete filters["exclusion_status"]}
  
  const updateFilters = () => {
    onFilterSelect(filters)
  }
  
  const resetFilters = () => {
    filters = {}
    onFilterSelect(null)
  }

  const closeFilter = () => {
    onClose(false)
  }

  return (
    <div>
      <Modal show={show} size="lg" >
        <Modal.Header>
          <Modal.Title>Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Configure which data filters will be used select table rows. </p>
          <h4>Notes:</h4>
          <ul>
            <li>Table rows will be selected only if they pass all filters. </li>
            <li>If field is left blank, it will not apply to the filters.</li>
          </ul>

          <RangeFilter label={'Sequence Length'} handleLower={handleLowerLengthChange} handleUpper={handleUpperLengthChange} />

          {/* <RangeFilter label={'Collection Year'} handleLower={handleEarliestChange} handleUpper={handleLatestChange} />

          <RangeFilter label={'NCBI Entry Creation'} handleLower={handleCreationLowerChange} handleUpper={handleCreationUpperChange} /> */}

          <SearchAutocomplete label={'Primary Accession'} url={'/api/filters/search_primary_accession_ids/'} idKey={'primary_accession'} handleId={handleNucleotideId}/>
          <SearchAutocomplete label={'Isolate ID'} url={'/api/filters/search_isolate_ids/'} idKey={'isolate'} handleId={handleIsolateId}/>
          <SearchAutocomplete label={'Pubmed ID'} url={'/api/filters/search_pubmed_ids/'} idKey={'pubmed_id'} handleId={handlePubmedId}/>
          <SearchAutocomplete label={'Host'} url={'/api/filters/search_hosts/'} idKey={'host'} handleId={handleHostSpecies}/>
          <div className='row'>
            <div className='col-6'>
              <SearchAutocomplete label={'Country'} url={'/api/filters/search_country/'} idKey={'display_name'} handleId={handleCountry}/>
            </div>
            
            <div className='col-6'>
              <AutoCompleteFilter label={'Global Region'} url={'/api/filters/search_region/'} idKey={'display_name'} handleId={handleRegion}/>
            </div>
          </div>
          <RadioButtonFilter label={'Excluded?'} label_values={['Yes', 'No']} value={[1, 0]} handleId={handleExclusion}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={resetFilters}>Reset</Button>
            <Button variant="secondary" onClick={closeFilter} >Cancel</Button>
            <Button className='btn-main' onClick={updateFilters} >Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SequencesFilter;




