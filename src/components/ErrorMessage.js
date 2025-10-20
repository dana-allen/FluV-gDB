import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import { useErrorHandler } from '../contexts/ErrorHandlerContext';

const ErrorMessage = ({ }) => {

  const { showError, error, clearError } = useErrorHandler();

  if (!error) return null;

  return (
    <div>
      <Modal show={showError} size="m">
        <Modal.Header>
          <Modal.Title> <FontAwesomeIcon color='red' icon={faTriangleExclamation} /> Error {error.status}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div> 
            <p><b>Message: </b>{error.message}</p> 
            {/* <p><b>Endpoint: </b>{error.endpoint}</p> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={clearError} >Close</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};


export default ErrorMessage;




