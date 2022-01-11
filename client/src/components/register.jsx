import React,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import MyVerticallyCenteredModal from "./popup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spin from "./spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons';
import {faHandshake} from '@fortawesome/free-solid-svg-icons';
import {faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
const axios = require("axios");

axios.defaults.withCredentials = true;



function Register(){
  const [topic,setTopic] = useState("");
  const [email,setemail] = useState("");
  const [modalShow,setModalShow] = useState({modalState:false,regCode:""});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  function changeEmail(event){
    setemail(event.target.value);
  }

  function changeTopic(event){
    setTopic(event.target.value);
  }

  function handleClose(){
    setModalShow({modelState:false,regCode:""});
    navigate("/billsplit");
  }

  function submitForm(event){
    event.preventDefault();
    setLoading(true);
    axios.post('https://billsplit26.herokuapp.com/api/', {
    userEmail: email,
    userTopic: topic
  })
  .then(function (response) {
    if(response.status === 200){
      if (response.data.status === "ok"){
        setLoading(false);
        setModalShow({modalState:true,regCode:response.data.code});
      }  
    }
  })
  .catch(function (error) {
    console.log(error.response);
    navigate("/error");
  });

  }

  return (
    <Container fluid>
    <div className="intro">
       <div>
          <h1 className="details1">Its never been easier</h1>
       </div>
       <div>
         <h2 className="details2">Get away from complex signing up or remembering password</h2>
       </div>
       <div>
         <h3 className="details3">Just put down your mail and you are all set to use the website</h3>
       </div>
    </div>
    <div className="middle">
    <form onSubmit = {submitForm} className="form-position">
    <Form.Group as={Row} className="content" controlId="exampleForm.ControlInput1">
    <Col md={4} sm={8} xs = {10}>
    <Form.Control type="email" placeholder="Write your Email Here" value = {email} onChange = {changeEmail} required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row} className="content" controlId="exampleForm.ControlInput1">
  <Col md={4} sm={8} xs = {10}>
    <Form.Control type="text" placeholder="Travel,dinner,trip...." value = {topic} onChange = {changeTopic} required/>
    </Col>
  </Form.Group>
  <Button type="submit" size="sm">Register</Button>{' '}
  <div className="loginBox">
    <h6>Already a user?<Link className="login-link" to="/login"> Click here</Link></h6>
  </div>
  </form>
  </div>
  <div className="end">
    <Container fluid>

      <Row>

        <Col md={4}>
        <FontAwesomeIcon icon={faUserSecret} className="icon-size"/>
          <h3 className="feature-title">Secure</h3>
          <p className="feature-details">Our site doesnt save your email. As soon as you register, we forget about your Email.</p>
        </Col>
        <Col md={4}>
        <FontAwesomeIcon icon={faHandshake} className="icon-size"/>
          <h3 className="feature-title">Easy UI</h3>
          <p className="feature-details">The simplest UI among other apps like us.</p>
        </Col>
        <Col md={4}>
        <FontAwesomeIcon icon={faTachometerAlt} className="icon-size"/>
          <h3 className="feature-title">Fast & Reliable</h3>
          <p className="feature-details">It is a single page application with React. Your details are saved automatically.</p>
        </Col>
      </Row>
    </Container>
  </div>
  <div>
  <MyVerticallyCenteredModal
        modalState={modalShow.modalState}
        hide={handleClose}
        regCode = {modalShow.regCode}
      />
    </div>
{loading?<Spin />:null}
</Container>
  );
}

export default Register;
