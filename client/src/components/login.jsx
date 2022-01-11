import React,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spin from "./spinner";
import "./styles.css";
const axios = require("axios");
axios.defaults.withCredentials = true;

function Login(){
  const [code,setcode] = useState("");
  const [msg,setmsg] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  function changeCode(event){
    setcode(event.target.value);
  }

  function submitForm(event){
    console.log("hey");
    event.preventDefault();
    setLoading(true);
    axios.post('https://billsplit26.herokuapp.com/api/login', {
    userCode: code
  })
  .then(function (response) {
    if(response.data.status === "ok"){
      setLoading(false);
      navigate("/billsplit");
    }
    else if (response.data.status === "not registered") {
      setLoading(false);
      setmsg("User not found");
    }
  })
  .catch(function (error) {
    console.log(error);
    navigate("/error");
  });
  }

  return (

    <Container fluid>
    <Row className="content">
    <Col  md={4} sm={8} xs={10}>
    <Card className="logincard">
  <Card.Body>
    <Card.Title className = "cardTitle">Login to your Account</Card.Title>
    <form onSubmit = {submitForm} className="form-position">
    <Form.Group as={Row} className="mb-3 content" controlId="exampleForm.ControlInput1">
    <Col md={8} sm={8} xs={10}>
    <Form.Control type="text" required value = {code} onChange = {changeCode}  placeholder="Secret Code"/>
    </Col>
  </Form.Group>
  {msg.length !==0?<p className="msg">{msg}</p>:null}
  <Button type="submit">Go!!</Button>
  <div className="loginBox">
    <h6>Not a user?<Link className="register-link" to="/"> Register here</Link></h6>
  </div>
  </form>
  </Card.Body>
</Card>
</Col>
  </Row>
  {loading?<Spin />:null}
</Container>
  );
}

export default Login;
