import React from "react";
import Logout from "./logout";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function OffCanvas(props) {
    
  
    return (
      <div>
        <Button className = "topbtns" variant="primary" onClick={props.handleShow}>
          Profiles({props.profileNames.length})
        </Button>
  
        <Offcanvas show={props.show} onHide={props.handleClose} placement="end" scroll = {true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{props.topic}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h6>Total Money Spent: {props.allCost}</h6>
            <p>Select profiles from below which you want to see on the screen.</p>
            {props.profileNames.length !==0?
            <Form>
            {props.profileNames.map((element,i)=>{
               return( <Form.Check
                     checked = {props.profileState[i]}
                     onChange = {()=>{return props.changeProfileState(i)}} 
                     type="switch"
                     id={i}
                     label={element}
                 />);
            })}
            </Form>
            :<p>No user yet added.</p>}
           <Logout />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  }

  export default OffCanvas;