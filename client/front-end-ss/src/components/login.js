import React from 'react'
import { NavLink } from 'react-router-dom';
import loginpic from "../images/login.png"
const Login = () =>{
    return(
      <>
       <div>
         <section className='signin'>
           <div className='container mt-1'>
             <div className='signin-content'>
             <div className='signin-image'>
                  <figure>
                    <img src={loginpic} alt="reg pic"/>
                  </figure>
                  <NavLink to="/register" className='signin-image-link'>Create an Account</NavLink>
                </div>
              <div className='signin -form'>
                <h2 className='form-title'>Sign In</h2>
                <form className='register-form' id='register-form'>
                 

                  <div className='form-group'>
                    <label htmlFor='name'>
                      <i class = 'zmdi zmdi-email material-icons-name'></i>
                    </label>
                    <input type='username' name='username' id = 'name' autocomplete='off' placeholder='UserName'></input>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'>
                      <i class = 'zmdi zmdi-lock material-icons-name'></i>
                    </label>
                    <input type='password' name='password' id = 'email' autocomplete='off' placeholder='password'></input>
                  </div>

                  <div className='form-group form-button'>
                    <input type='submit' name = 'signin' id='signin' className='form-submit' value='Log In'/>
                  </div>
                </form>
                </div>
              
            </div>
           </div>
         </section>
        </div>
        </>
    )
}

export default Login;