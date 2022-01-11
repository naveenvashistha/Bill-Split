import React from "react";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

function Lent(props){
      
      const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Ask your money back</Popover.Header>
          <Popover.Body className="popover-scroll">
          {props.owe.some(item => item !== 0)?props.owe.map((item,i)=>{
          return (item === 0?null:<p>{props.profile[i].pname} owe you: {item} </p>);
           }):<p>No Owed Money</p>}
          </Popover.Body>
        </Popover>
      );
      return (
        <div>
          <OverlayTrigger trigger="click" placement="left" overlay={popover}>
               <Button size="sm">Owe</Button>
          </OverlayTrigger>       
          
    </div>
  );
}

export default Lent;
