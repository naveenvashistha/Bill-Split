import React from "react";
import Login from "./login";
import Register from "./register";
import BillSplit from "./billsplit";
import Navigation from "./navigation";
import Error from "./error";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import "./styles.css";

function App(){
  return (
    <Router>
      <div>
      <Navigation />
      <Routes>
       <Route path='/' element={<Register />}></Route>
       <Route path='/login' element={<Login />}></Route>
       <Route path='/billsplit' element={<BillSplit />}></Route>
       <Route path = "/error" element= {<Error />}></Route>
       <Route path = "*" element={<Register />}></Route>
       </Routes>
      </div>
    </Router>
  );
}

export default App;
