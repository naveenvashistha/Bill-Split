import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Spin(){
   return (
    <div className='parentDisable'>
    <div className='overlay-box'>
    <Spinner animation="border" role="status">
           <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
</div>
   );
}

export default Spin;