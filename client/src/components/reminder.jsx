import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

function Reminder(props){
  const [reminderText,setreminderText] = useState("");

  function changeReminderText(event){
    setreminderText(event.target.value);
  }

  return (
    <div>
    <form onSubmit={(event)=>{return props.reminderAdded(event,reminderText,setreminderText,props.playerId)}}>
    <Row>
       <Col md={9} sm={9} xs={9} className="mb-3 d-flex justify-content-center">
         <Form.Control type="text" value = {reminderText} placeholder = "Reminders!" onChange ={changeReminderText} required/>
       </Col>
      <Col md={3} sm={3} xs={3} className="d-flex justify-content-center reminder-btn">
        <Button size = "sm" type="submit">Add</Button>
      </Col>
    </Row>
    </form>
    <div>
     {props.allReminders.map((item,i)=>{
       return (
         <div className="history-box">
         <Row>
         <Col md={8} sm={8} xs={8}>{item}</Col>
         
         </Row>
         <FontAwesomeIcon icon={faTrashAlt} onClick = {()=>{return props.reminderDeleted(i,props.playerId)}} className="delete-icon"/>
        </div>
       );
     })}
    
    {props.allReminders.length === 0?<p>No reminders for you!</p>:null}
    </div>
    </div>

  );
}

export default Reminder;
