import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'


const PubMedRefDetails = ({ pubmedId }) => {
    
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <h4 className='title-sub'>Reference</h4>
                </div> 
            </div> 
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <Link className='custom-link reference' to={`https://www.ncbi.nlm.nih.gov/pubmed/${pubmedId}`} target="_blank"> <FontAwesomeIcon icon={faLink} /> PubMed {pubmedId} </Link>
                    </div>
                </div>  
            </div> 
        </div>
    );
};

export default PubMedRefDetails;