import React from 'react'
import "./App.css"
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import About from './components/about';
import Sync from './components/sync';

const App = () =>{
    return(
<>
          <Navbar/>
          <Routes>
          <Route exact path="/" element={<Home/>}/>   
          </Routes>
         
        <Routes>
        <Route path='/login' element={<Login/>}/> 
         </Routes>

         <Routes>
          <Route path='/register' element={<Register/>}/>
         </Routes>  

         <Routes>
          <Route path='/about' element={<About/>}/>
         </Routes> 
         <Routes>
          <Route path='/sync' element={<Sync/>}/>
         </Routes> 
         </>  
    )
}

export default App;
