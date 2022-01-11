import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Spin from "./spinner";
const axios = require("axios");
axios.defaults.withCredentials = true;


function Logout(props){
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
   function userLogout(){
       setLoading(true);
       axios.get("https://billsplit26.herokuapp.com/api/logout")
          .then((response)=>{
              setLoading(false);
              navigate("/login");
          })
          .catch((error)=>{
              console.log(error);
              navigate("/error");
          });
   }
   return(
     <div>
         <Button size="sm" className="logoutbtn" onClick={userLogout}>Logout</Button>
         {loading?<Spin />:null}
     </div>
   );
}

export default Logout;