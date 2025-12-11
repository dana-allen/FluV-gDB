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
          <p><small>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} is developed by the <a target="_blank" href="http://www.gla.ac.uk/researchinstitutes/iii/cvr/">MRC-University of Glasgow Centre for Virus Research</a>.
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
              <a target="_blank" href="https://www.gla.ac.uk/research/az/cvr/">
                <img className='ibahcm-logo' alt="UofG logo" src="/footer/UoG1.png"></img>
              </a>	
              <a target="_blank" href="https://www.rvc.ac.uk/">
                <img className='apha-logo' alt="RVC logo" style={{backgroundColor:"rgb(127, 63, 152)"}} src="/footer/rvc_logo.png"></img>
              </a>
              <a target="_blank" href="">
                <img className='apha-logo' alt="Trail Map logo" src="/footer/cropped_logo.png"></img>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;