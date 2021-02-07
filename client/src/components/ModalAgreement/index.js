import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import CommunityAgreements from '../../pages/CommunityAgreements'
import "./style.css";

import buttonImage from "./community-agreements.png";

function ModalAgreement() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div className= "d-flex justify-content-center">
        <a onClick={handleShow} >
          <img src={buttonImage} alt="Community Agreements" />
        </a>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Body> <CommunityAgreements /> </Modal.Body>
        </Modal>
      </div>
    );
  }
  
 export default ModalAgreement;

