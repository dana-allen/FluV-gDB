import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import TreeView from '../trees/TreeView';
import { Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material'
import RadioButtonFilter from './components/RadioButtonFilter';
import submitApiQuery from '../../callbacks/submitApiQuery'
// import LoadingWheel from '../shared/LoadingWheel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
// import { useLoadingWheelHandler } from '../../contexts/LoadingWheelContext'

import '../../assets/styles/filters.css'

const AlignmentFilter = ({show, onClose, params, sequences}) => {


    // const { triggerLoadingWheel } = useLoadingWheelHandler();
    // triggerLoadingWheel(true)


    const [features, setFeatures] = useState([]);
    const [genomeDisplay, setGenomeDisplay] = useState('');

    const [region, setRegion] = useState('entirety');
    const [fullOrPartial, setFullOrPartial] = useState('entirety');
    const [coordinates, setCoordinates] = useState('')

    const [startCoordinate, setStartCoordinate] = useState('');
    const [endCoordinate, setEndCoordinate] = useState('');

    const [isPending, setIsPending] = useState(false)

    const closeFilter = () => {
        onClose(false)
      }

    const getFeatures = async (data) => {

        if (data.status === 200){
            const json = await data.json();  
            setFeatures(json) 
        }
    }

    const handleRegionChange = (value) => {
        setRegion(value)
        setGenomeDisplay(value)
    }

    const handleShow = () => {
        const fullUrl = `${process.env.REACT_APP_BACKEND_URL}${'/api/genes/get_genes_tree'}`;
        submitApiQuery(fullUrl, false, getFeatures)
    }

    const handleData = async (data) => {
        if (data.status === 200){
            const blob = await data.blob();  
            var url = window.URL.createObjectURL(blob);
                    // Try to extract filename from Content-Disposition header
            const disposition = data.headers.get('Content-Disposition');
            let filename = 'download.fasta'; // default filename
            if (disposition && disposition.includes('filename=')) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setIsPending(false)

        }
        setIsPending(false)
        onClose(false)

    }

    const downloadAlignment = () => {
        setIsPending(true)
        var filters = {}
        console.log(params)
        filters["region"] = region
        filters["full_partial"] = fullOrPartial
        filters["nucleotide_or_codon"] = coordinates
        filters["start"] = startCoordinate
        filters["end"] = endCoordinate

        filters["filters"] = JSON.stringify(params)
        if(region == 'entirety'){
            filters["start"] = ''
            filters["end"] = ''
        }

        const queryString = new URLSearchParams(filters).toString();
        
        submitApiQuery(`${process.env.REACT_APP_BACKEND_URL}/api/alignments/download_alignments/`,
            queryString,
            handleData
        )
    }

    const [advancedDownload, setAdvancedDownload] = useState(false)
    const [basic, setBasic] = useState(true)
    const [advanced, setAdvanced] = useState(false)
    const handleToggle = (e) => {
        basic ? setBasic(false) : setBasic(true)
        advanced ? setAdvanced(false) : setAdvanced(true)
    }
    
    return (
        <Modal show={show} onShow={handleShow} size="lg" >
            <Modal.Header>
                <Modal.Title>Download Alignment</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            
                <h5>About {process.env.REACT_APP_WEB_RESOURCE} alignments</h5>
                <p className='info-text'>
                    This will download all alignments in sequences list according to their 
                    reference alignment. If you have applied filtering to the sequences, those filters will 
                    be applied when downloading the alignments. 
                </p>
                <hr></hr>
                <div>
                    <label key='basic' className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={basic}
                            checked={basic}
                            onChange={() => handleToggle()}
                            className="accent-color-primary w-4 h-4"
                        />
                        <span>&nbsp;Basic Download:</span>
                    </label>
                        
                    <p classname='info-text'>
                        Download full genome for all <b>{sequences.length}</b> selected sequences.
                    </p>

                    <label key='advanced' className="flex items-center">
                            <input
                                type="checkbox"
                                value={advanced}
                                checked={advanced}
                                onChange={() => handleToggle()}
                                className=" accent-color-primary w-4 h-4"
                            />
                            <span onClick={e => setAdvancedDownload(!advancedDownload)} > Advanced Download: <Button className='btn-secondary-outline download-btn' size='sm' onClick={e => setAdvancedDownload(!advancedDownload)}> <FontAwesomeIcon icon={advancedDownload ? faCaretUp : faCaretDown}/></Button></span>
                        </label>

                    <p className='info-text'>
                        Select specific genome regions and corresponding nucleotides and/or codons for all <b>{sequences.length}</b> selected sequences.
                    </p>
                    {advancedDownload &&
                        <div>
                            <h5>Select Genome Region:</h5>
                            
                            <div className='row'>
                                <div className="col-12">
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={e => handleRegionChange(e.target.value)}  
                                        >
                                            {features.map((feature, i) => (
                                                <FormControlLabel value={feature.name} 
                                                                control={<Radio size="small" 
                                                                                sx={{
                                                                                    color: 'var(--primary)',
                                                                                    '&.Mui-checked': {color: 'var(--primary)',},
                                                                                }}/>} 
                                                                                label={feature.text} />

                                            ))}

                                            
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>
                                {/* <div> */}
                            {genomeDisplay != '' && 
                                <div>
                                    <h5>Select Alignment Region:</h5>
                                    <RadioButtonFilter 
                                        label={undefined}
                                        label_values={['Entirety', 'Subregion']}
                                        value={['entirety', 'subregion']}
                                        handleId={e => setFullOrPartial(e)} 
                                    ></RadioButtonFilter>
                                
                                </div>
                            }
                                
                            {fullOrPartial === 'subregion' && 
                                <div>
                                    <h5> Select Subregion Coordinates:</h5>
                                    <div classname='left-margin'>

                                        <RadioButtonFilter 
                                            label={undefined}
                                            label_values={['Nucleotide', 'Codon']}
                                            value={['nucleotide', 'codon']}
                                            handleId={e => setCoordinates(e)} 
                                        ></RadioButtonFilter>
                                    </div>  
                                </div>
                            }
                            {fullOrPartial === 'subregion' &&
                                <div className='left-margin'>
                                    <p> 
                                        {coordinates} &nbsp;
                                        <input placeholder={`start ${coordinates}`} onChange={e => setStartCoordinate(e.target.value)} />&nbsp;
                                        to &nbsp;
                                        <input placeholder={`end ${coordinates}`} onChange={e => setEndCoordinate(e.target.value)} />
                
                                    </p>
                                </div>
                            }
                        </div>
                    }  
                </div>
                <br></br>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Reset</Button>
                <Button variant="secondary" onClick={closeFilter} >Cancel</Button>
                <Button className='btn-main' onClick={downloadAlignment}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AlignmentFilter;
