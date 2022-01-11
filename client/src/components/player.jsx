import React,{useState} from "react";
import Lent from "./lent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import Form from "react-bootstrap/Form";
import Select from 'react-select';


function Player(props){
  var todayDate = new Date().toISOString().slice(0, 10);
  const [formPage,setformPage] = useState(1);
  const [price,setPrice] = useState({id:0,cost:"",title:"",date:todayDate});
  const [selectPlayer,setSelectPlayer] = useState([]);
  const [radioState,setradioState] = useState("equally");
  const [unequalPrices,setunequalPrices] = useState(props.unequal);
  if (Object.keys(props.unequal).length !== Object.keys(unequalPrices).length){
    setunequalPrices(props.unequal);
  }
  function changePrice(event,playerId){
    let {name,value} = event.target;
    setPrice(preValue=>{
      return {
        ...preValue,
        id: playerId,
        [name]: value
      };
    });
}
function changeSelect(event){
  console.log(event);
  if(event.length !==0 && event[event.length-1].value === "everyone"){
    setSelectPlayer([...props.profile,{value:"everyone",label:"Everyone"}]);
  }
  else{
  setSelectPlayer(event);
  }
}

function changeRadioState(event){
  setradioState(event.target.value);
  setunequalPrices(props.unequal);
}

function changeUnequalPrices(event){
  let {name,value} = event.target;
  console.log(event.target);
  console.log(name);
  console.log(value);
  setunequalPrices(preValue=>{
    return {
      ...preValue,
      [name]: value
    }
  });
}

function handleRight(){
     setformPage(formPage+1);
}

function handleLeft(){
   setformPage(formPage-1);
}

  return (
    <div id = {props.id}>
    <form onSubmit = {(event)=>{
      return props.doSum(event,props.id,price,setPrice,props.playerName,selectPlayer,setSelectPlayer,radioState,setradioState,unequalPrices,setunequalPrices,setformPage);
    }
    }>
    {formPage === 1?
    <div>
       <div className="userBtn">
       <h3>{props.playerName}</h3>
       <Lent 
         profile = {props.allProfiles}
         owe = {props.actualOwe}
       />
       </div>
       <h4>Spent: {props.cost}</h4>
       <h4>Share: {props.groupShare}</h4>
       <Row className="content">
       <Form.Group as={Col} md={6} sm={6} xs={8} className="mb-3" controlId="exampleForm.ControlInput1">
         <Form.Control type="date" name="date" value = {price.date} onChange ={(event)=>{return changePrice(event,props.id)}}/>
       </Form.Group>
       </Row>
       <Row className="content">
       <Form.Group as={Col} md={6} sm={6} xs={8} className="mb-3" controlId="exampleForm.ControlInput2">
         <Form.Control name="title" value = {price.title} placeholder = "write purpose!" onChange ={(event)=>{return changePrice(event,props.id)}}/>
       </Form.Group>
       </Row>
       <Row className="content">
       <Form.Group as={Col} md={6} sm={6} xs={8} className="mb-3" controlId="exampleForm.ControlInput3">
         <Form.Control type="text" pattern= "[0-9]+" name="cost" value = {price.cost} placeholder = "write price!" onChange ={(event)=>{return changePrice(event,props.id)}}/>
       </Form.Group>
       </Row>
       <div className="err-msg">
       {props.msg[0]==="E"?<h6>{props.msg}</h6>:null}
       </div>
       <FontAwesomeIcon icon={faChevronCircleRight} onClick={handleRight} className="formpage-icon-right"/>
       </div>
       :null}

       {formPage === 2?
       <div>
       <h6>Select the people you want share this amount with?</h6>
       <Select
          isSearchable = {false}
          isMulti
          name="members"
          defaultValue = {{value:"everyone",label:"Everyone"}}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          options={[...props.profile,{value:"everyone",label:"Everyone"}]}
          value = {selectPlayer}
          onChange = {(event)=>{return changeSelect(event)}}
          />

       <FontAwesomeIcon icon={faChevronCircleLeft} onClick={handleLeft} className="formpage-icon-left"/>
       <FontAwesomeIcon icon={faChevronCircleRight} onClick={handleRight} className="formpage-icon-right"/>
       </div>
      :null}

      {formPage === 3?
      <div>
      <div className="userBtn">
      <h6>How do you want share the amount with selected people?</h6>
      <Button size="sm" type="submit">Add</Button>
       </div>
      
      <Row className="content">
      <Form.Group as={Col}>
      <Form.Check 
        type="radio"
        value = "equally"
        checked ={radioState === "equally" }
        onChange = {changeRadioState}
        label="Equally"
      />
      </Form.Group>
       <Form.Group as={Col}>
      <Form.Check 
        type="radio"
        value = "unequally"
        checked ={radioState === "unequally" }
        onChange = {changeRadioState}
        label="Unequally"
      />
      </Form.Group>
      <div className="err-msg">
       {props.msg[0]==="S"?<h6>{props.msg}</h6>:null}
       </div>
      </Row>
      <div className="unequal-label">
      {radioState === "unequally"?selectPlayer.length === 0 || selectPlayer[selectPlayer.length - 1].value === "everyone"?
      props.profile.map((ele,i) =>{
        return (
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column md="6" sm="6" xs="6">{ele.label}</Form.Label>
          <Col md={6} sm={6} xs={6}>
          <Form.Control type="number" name={ele.label} value = {unequalPrices[ele.label]} placeholder = "individual share!" onChange = {changeUnequalPrices}/>
          </Col>
          </Form.Group>
          
          );
      }):
      selectPlayer.map((ele,i) =>{
        return (
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column  md="6" sm="6" xs="6">{ele.label}</Form.Label>
          <Col md={6} sm={6} xs={6}>
          <Form.Control type="number" name={ele.label} value = {unequalPrices[ele.label]} placeholder = "individual share!" onChange = {changeUnequalPrices}/>
          </Col>
          </Form.Group>
          
          );
      })
      :null}
      </div>
      
      
      
       <FontAwesomeIcon icon={faChevronCircleLeft} onClick={handleLeft} className="formpage-icon-left"/>
       
      </div>
     :null}
  </form>
  </div>
  );
}

export default Player;


