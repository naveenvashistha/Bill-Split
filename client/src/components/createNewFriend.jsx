import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function CreateNewFriend(props){
  const [friend,setFriend] = useState({id:0,pname:"",cost:0,owe:[0],history:[],reminders:[]});
  function handleChange(event){
    let {name,value} = event.target;
    setFriend(preValue=>{
      return {
      ...preValue,
      [name]:value
}
    });
  }

  return (
    <div>
      <Form onSubmit = {(event)=>{
        return props.added(event,friend,setFriend);
      }}>
      <Row>
      <Form.Group as={Col} md={5} sm={4} xs={5} className="mb-3 addbtn" controlId="exampleForm.ControlInput1">
      <Form.Control name="pname" placeholder="write name" value = {friend.pname} onChange = {handleChange} required/>
        </Form.Group>
        <Col className = "addbtn">
         <Button type = "submit">Add</Button>
         </Col> 
        </Row>
      </Form>
    </div>
  );
}

export default CreateNewFriend;
