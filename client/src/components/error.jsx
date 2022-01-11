import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./styles.css";

function Error(){
  return (
    <div className="error-page">
    <Row className="content">
      <Col lg = {4} md = {4} sm = {12} xs = {12} className="d-flex justify-content-center">
      <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon"/>
      </Col>
    </Row>
      <Row className="content">
      <Col lg = {8} md = {8} sm = {12} xs = {12}>
        <div className="error-text">
       <h1 className="centered error-msg-size">Something went wrong</h1>
         <h1 className="centered error-msg-size">Try Again</h1>
         </div>
      </Col>
      </Row>
    
  </div>
  );
}

export default Error;
