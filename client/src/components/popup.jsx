import React from "react";
import {Modal,Button} from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        show ={props.modalState}
        onHide=  {props.hide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Heya! Congrats on Successful Registration
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your secret code to access your account in future is <b>{props.regCode}. </b>
            We have already sent the same code to your mentioned Email.
            See you inside. 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.hide}>Bye</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;