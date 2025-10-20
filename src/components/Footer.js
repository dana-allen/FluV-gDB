import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/dropdown.js';
import '../assets/styles/footer.css'

const Footer = () => {
  return (
    <div>
      <hr></hr>
      <div className="row">
        <div className="col-md-3">
            <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/">
              <img className='cvr-logo' alt="CVR logo" src="/footer/cvrBioinformatics.png"/>
            </a>
        </div>

        <div className="col-md-9">
          <p><small>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} is based on the <a target="_blank" href="https://github.com/josephhughes/V-gTK">Viral Genome Toolkit</a> software framework, developed by the 
            <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/"> MRC-University of Glasgow Centre for Virus Research</a>, in collaboration with the <a href=""> University of Glasgow 
            Institue of Biodiversity Animal Health and Comparative Medicine</a>, the <a href="">UK Government Animal and Plant Health Agency</a>, and the <a href="">US Centers for Disease Control and Prevention</a>.  
            Contact <a href="">Web Resource Support</a> with questions or feedback.
            <br/><span className='beta-text'>Please note this is beta software, still undergoing development and testing before its official release.</span></small>
          </p> 
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="text-center">
              <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/">
                <img className='mrc-logo' alt="MRC logo" src="/footer/MRC1.png"/>
              </a>
              <a target="_blank" href="https://www.gla.ac.uk/researchinstitutes/bahcm/">
                <img className='ibahcm-logo' alt="IBAHCM logo" src="/footer/IBAHCM.png"></img>
              </a>	
              <a target="_blank" href="https://www.gov.uk/government/organisations/animal-and-plant-health-agency">
                <img className='apha-logo' alt="APHA logo" src="/footer/APHA_desat.png"></img>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;