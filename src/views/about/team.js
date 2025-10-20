import { useState } from "react";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faResearchgate } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'

import teamsList from '../../assets/team.json'
import '../../assets/styles/about.css'

const TeamMember = ({member, show, onClose}) => {
    
    const closeFilter = () => {
        onClose(false)
    }

    return (
         <Modal show={show} size="lg">
            <Modal.Header>
                <div>
                    <p className="mb-0"><strong>{member.name}</strong></p>
                    <p className="mb-0 font-m gray-text">
                        {member.title}
                    </p>
                    <p className='font-m'>{member.affiliation}</p>
                </div>
                <button type="button" className="btn-close" onClick={closeFilter}></button>
            </Modal.Header>
            <Modal.Body>

                <div className="row align-items-center">
                    <div className="col-md-2 text-center">
                        <img
                            src={member.photo_src}
                            alt={member.name}
                            className="card-img-top img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-10">
                        <p>{member.info}</p>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-1">
                    { member.rg_link && <Link className='custom-link' to={member.rg_link}><FontAwesomeIcon icon={faResearchgate} size='2x'/></Link> }
                    </div>
                    <div className="col-md-1">
                    { member.twitter_link && <Link className='custom-link' to={member.twitter_link}><FontAwesomeIcon icon={faXTwitter} size='2x'/></Link> } 
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )

}

const Team = () => {
    const [show, setShow] = useState(false);
    const [memberData, setMemberData] = useState();
    
    const handleClick = (m) => {
        setShow(true)
        setMemberData(m)
    }

    return (
        <div className="container">
            <h2>{process.env.REACT_APP_VIRUS_ABB}-{process.env.REACT_APP_WEB_RESOURCE} Team</h2>
            <hr />
            <div className="row">
                {teamsList.filter(member => member.status !== 0).map((member, i) => (
                <div key={i} className="col-md-3 mb-2">
                    <div className="card h-100 border-0 team-card" onClick={() => handleClick(member)}>
                        <div className="d-flex align-items-center p-2">
                        <img
                            className='img-team'
                            src={member.photo_src}
                            alt={member.name}
                        />
                        <div>
                            <p className="mb-0 fw-bold">{member.name}</p>
                            <p className="mb-0 gray-text" >
                            {member.title}
                            </p>
                            <p className='affiliation'>
                            {member.affiliation}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            <hr></hr>
            <h2>Former Team Members</h2>
            <hr />
            <div className="row">
                {teamsList.filter(member => member.status === 0).map((member, i) => (
                    <div key={i} className="col-md-3 mb-2">
                    <div className="card h-100 border-0 team-card" onClick={() => handleClick(member)}>
                        <div className="d-flex align-items-center p-2">
                            <img
                                className='img-team'
                                src={member.photo_src}
                                alt={member.name}
                            />
                        <div>
                            <p className="mb-0 fw-bold">{member.name}</p>
                            <p className="mb-0 gray-text">
                            {member.title}
                            </p>
                            <p className='affiliation'>
                            {member.affiliation}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
            {show && <TeamMember show={show} member={memberData} onClose={() => setShow(false)}/>}
        </div>

    );
};
 
export default Team;
