
import React,{useState,useEffect} from "react";
import CreateNewFriend from "./createNewFriend";
import Player from "./player";
import Reminder from "./reminder";
import Transaction from "./transactions";
import {useNavigate} from "react-router-dom";
import OffCanvas from "./offCanvas";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Spin from "./spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "./styles.css";
const axios = require("axios");
var _ = require('lodash');
axios.defaults.withCredentials = true;

function BillSplit(){
  useEffect(() => {
    setLoading(true);
    axios.get('https://billsplit26.herokuapp.com/api/billsplit')
        .then(response =>{
            if(response.data.status === "ok"){
              
              var profile1 = response.data.result;

              if(profile1.length !== 0){
                var actualOwe1 = [];
                var share1 = new Array(profile1.length).fill(0);
                for(var k = 0;k<profile1.length;k++){
                  actualOwe1.push(new Array(profile1.length).fill(0)); 
                }
                [actualOwe1,share1] = calculateActualOweAndShare(actualOwe1,profile1,share1);
                setLoading(false);
                setTopic(response.data.topic);
                setactualOwe(actualOwe1);
                setShare(share1);
                setProfile(profile1);
                
              }
              else{
                setLoading(false);
                setTopic(response.data.topic);
              }
            } else if(response.data.status === "go to login"){
              navigate("/login");
            }
            
              
        })
        .catch(error=>{
           navigate("/error");
        });
        

  }, []);


   const [profile,setProfile] = useState([]);
   const [loading,setLoading] = useState(false);
   const [actualOwe,setactualOwe] = useState([]);
   const [share,setShare] = useState([]);
   const [profileState,setprofileState] = useState([]);
   const [show, setShow] = useState(false);
   const [errmsg,seterrmsg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const navigate = useNavigate();
   const [topic,setTopic] = useState("");



   function added(event,friend,setFriend){
       event.preventDefault();
       var profile1 = [...profile];
       var friend1 = {...friend};
       var actualOwe1 = [...actualOwe];

       if(profile.length === 0){
           actualOwe1 = [[0]];
           profile1.push(friend1);
       }
       else{
           for(var i = 0;i<profile1.length;i++){
               actualOwe1[i].push(0);
               profile1[i].owe.push(0);
               friend1.owe.push(0);
           }
           actualOwe1.push(new Array(profile.length+1).fill(0));
           profile1.push(friend1);
       }
       setLoading(true);
       axios.post('https://billsplit26.herokuapp.com/api/billsplit', {
              updatedDetails: profile1
          })
          .then(function (response) {
              if(response.status === 200){
                 if (response.data.status === "ok"){
                   setLoading(false);
                     console.log("successfully saved");
                     setprofileState(preValue=>{
                      return [...preValue,false];
                    });
                     setFriend({id:0,pname:"",cost:0,owe:[0],history:[],reminders:[]});
                     setactualOwe(actualOwe1);
                     setProfile(profile1);
                     
                    }
                    else if(response.data.status === "go to login"){
              navigate("/login");
            }  
                  }
          })
         .catch(function (error) {
                console.log(error.response);
                navigate("/error");
          });
       
   }

   function changeProfileState(i){
        var profileState1 = [...profileState];
        profileState1[i] = !profileState1[i];
        setprofileState(profileState1);
   }

   function doSum(event,playerId,price,setPrice,playerName,selectPlayer,setSelectPlayer,radioState,setradioState,unequalPrices,setunequalPrices,setformPage){
    event.preventDefault();
    if (_.trim(price.title) !== "" && (/^\d+$/.test(_.trim(price.cost)))){
    var profile1 = [...profile];
    var selectPlayer1 = [...selectPlayer];
    var share1 = new Array(profile.length).fill(0);
    var uneq = Object.values(unequalPrices)
    var sum = 0;
    for(var i = 0;i<profile1.length;i++){
        sum = sum + Number(uneq[i]);
    }

    if (Number(price.cost) === Number(sum) || radioState === "equally"){
        profile1[playerId].id = playerId;
        profile1[playerId].cost = Number(profile1[playerId].cost) + Number(price.cost);
  
      if(radioState === "equally"){
        if (selectPlayer1.length === 0 || selectPlayer1[selectPlayer1.length-1].value === "everyone"){
          selectPlayer1 = [];
          let share = Number(price.cost)/profile1.length;
          for (var i=0;i<profile1.length;i++){
            profile1[playerId].owe[i] += share;
        }
      }
        else{
        selectPlayer1 = selectPlayer.map((item,i)=>{
            return item.value;
        });
        selectPlayer1.sort();
        let share = Number(price.cost)/selectPlayer1.length;
        for (var i=0;i<selectPlayer1.length;i++){
            profile1[playerId].owe[selectPlayer1[i]] += share;
        }
      }
    }
     else{
      if (selectPlayer1.length === 0 || selectPlayer1[selectPlayer1.length-1].value === "everyone"){
        selectPlayer1 = [];
        for (var i=0;i<profile1.length;i++){
          profile1[playerId].owe[i] += Number(uneq[i]);
      }
    }
      else{
        selectPlayer1 = selectPlayer.map((item,i)=>{
            return item.value;
        });
        selectPlayer1.sort();
      for (var i=0;i<selectPlayer1.length;i++){
          profile1[playerId].owe[selectPlayer1[i]] += Number(uneq[selectPlayer1[i]]);
      }
    }
    }
      var actualOwe1 = [];
      var todayDate = new Date().toISOString().slice(0, 10);
      var unequal = profile.reduce(reducer,{});
      [actualOwe1,share1] = calculateActualOweAndShare(actualOwe1,profile1,share1);
      profile1[price.id].history.push({title:price.title,amount:price.cost,date:price.date,unequalDivision:unequalPrices,sharedHow:radioState,deletedHistory:false,sharing:selectPlayer1});
      setLoading(true);
      axios.post('https://billsplit26.herokuapp.com/api/billsplit', {
              updatedDetails: profile1
          })
          .then(function (response) {
              if(response.status === 200){
                 if (response.data.status === "ok"){
                     console.log("successfully saved");
                     setLoading(false);
                     setunequalPrices(unequal);
                     setactualOwe(actualOwe1);
                     setShare(share1);
                     setPrice({id:0,cost:"",title:"",date:todayDate});
                     setSelectPlayer([]);
                     setradioState("equally");
                     setformPage(1);
                     seterrmsg("");
                     setProfile(profile1);
                    }
                    else if(response.data.status === "go to login"){
                            navigate("/login");
                     } 
                  }
          })
         .catch(function (error) {
                navigate("/error");
          });
     
}
else{
  setformPage(3);
  seterrmsg("Sum of all individual sum must be equal to mentioned sum");
  
    
}
    }
  else{
    setformPage(1);
    seterrmsg("Either purpose or cost field is wrongly filled or empty");
      
  }
      
}
  function reducer(pre,nex){
    return Object.assign(pre, {[nex.pname]: 0});
}

function calculateActualOweAndShare(actualOwe1,profile1,share1){
  for(var i = 0;i<profile1.length;i++){
    actualOwe1.push(new Array(profile1.length).fill(0));
    for(var j = 0;j<profile1.length;j++){
        share1[i] = Number(share1[i]) + Number(profile1[j].owe[i]);
    }
  }

  for(var i = 0;i<profile1.length;i++){
    for(var j = 0;j<profile1.length;j++){
        if(i !== j){
          if(profile1[i].owe[j] > profile1[j].owe[i]){
              actualOwe1[i][j] = Number(profile1[i].owe[j]) - Number(profile1[j].owe[i]);
          }
          else{
            actualOwe1[j][i] = Number(profile1[j].owe[i]) - Number(profile1[i].owe[j]);
          }
        }
    }
  }
  return [actualOwe1,share1];
}


function reminderAdded(event,reminderText,setreminderText,playerId){
   event.preventDefault();
    var profile1 = [...profile];
    profile1[playerId].reminders.push(reminderText);
    setLoading(true);
    axios.post('https://billsplit26.herokuapp.com/api/billsplit', {
              updatedDetails: profile1
          })
          .then(function (response) {
              if(response.status === 200){
                 if (response.data.status === "ok"){
                   setLoading(false);
                     console.log("successfully saved");
                     setreminderText("");
                     setProfile(profile1);
                     
                    }
                    else if(response.data.status === "go to login"){
                              navigate("/login");
                      }  
                  }
          })
         .catch(function (error) {
                navigate("/error");
          });
}

function reminderDeleted(i,playerId){
  var profile1 = [...profile];
  profile1[playerId].reminders = profile1[playerId].reminders.filter((element,ele)=>{return ele !== i});
  setLoading(true);
  axios.post('https://billsplit26.herokuapp.com/api/billsplit', {
              updatedDetails: profile1
          })
          .then(function (response) {
              if(response.status === 200){
                 if (response.data.status === "ok"){
                     setLoading(false);
                     console.log("successfully saved");
                     setProfile(profile1);
                    }
                    else if(response.data.status === "go to login"){
                        navigate("/login");
                     }  
                  }
          })
         .catch(function (error) {
                navigate("/error");
          });
}

return (
  <div>
  <div className="userBtn">
  <div className = "topbtns" >
  <CreateNewFriend 
       added = {added}
  />
  
  </div>
  <div>
  <OffCanvas
    show = {show}
    handleClose = {handleClose}
    handleShow = {handleShow}
    changeProfileState =  {changeProfileState}
    profileState = {profileState}
    profileNames =  {profile.map(ele=>ele.pname)}
    topic = {topic}
    allCost = {profile.reduce(function (previousValue, currentValue){
      if(currentValue.cost === ""){
        return Number(previousValue) + 0;
      }
      else{
        return Number(previousValue) + Number(currentValue.cost);
      }
},0)}
  />
  </div>
  </div>
  <Row>
  {profile.map((element,i)=>{
    if(profileState[i]===true){
     return (
       <Col lg = {4} md={6} sm={6} xs={12}>
       <Card className="profilecard">
       <Card.Body className="noPadding">
      <Tabs sticky="top" defaultActiveKey="Split" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="Split" title="Split">
          <Player
         doSum = {doSum} 
         id = {i}
         key = {i}
         unequal = {profile.reduce(reducer,{})}
         groupShare = {share[i]}
         playerName = {element.pname}
         cost = {element.cost}
         profile = {profile.map((item,index)=>{return {value:index,label:item.pname}})}
         allProfiles = {profile}
         actualOwe = {actualOwe[i]}
         msg = {errmsg}
       />
       
          </Tab>
          <Tab eventKey="transactions" title="Transactions">
          {element.history.length !== 0?<Transaction
          profile = {profile}
          setLoading={setLoading}
          player = {element}
          setProfile = {setProfile}
          setShare = {setShare}
          setactualOwe = {setactualOwe}
          calculateActualOweAndShare = {calculateActualOweAndShare}
        />:<p>No Transaction made till now</p>}
          </Tab>
           <Tab eventKey="Reminders" title="Reminders">
           <Reminder 
          reminderAdded = {reminderAdded}
          reminderDeleted = {reminderDeleted}
          allReminders = {element.reminders}
          playerId = {i} 
        />
           </Tab>
       </Tabs>
       </Card.Body>
       </Card>
       </Col>
     );
    }
    else{
      return null;
    }
  })}
  </Row>
  {loading?<Spin />:null}
  </div>
);
}



export default BillSplit;