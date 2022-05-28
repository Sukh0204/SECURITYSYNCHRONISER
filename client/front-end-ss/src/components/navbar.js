import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const Navbar = () =>{
    return(  
        <>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#" >SECURITY SYNCHRONIZER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">HOME <span cclassName="sr-only"></span></NavLink>
      </li>
    
      <li className="nav-item">
        <NavLink className="nav-link" to ="/about">ABOUTME</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">REGISTER</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">LOGIN</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to ="/">LOGOUT</NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink class="nav-link" to ="/sync">SYNC</NavLink>
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" to="/home">LOGOUT</NavLink>
      </li> */}
      
    </ul>
    {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
  </div>
</nav>
</>
    )
}

export default Navbar