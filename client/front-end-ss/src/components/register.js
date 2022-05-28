import React, {useState} from 'react'
import { NavLink , useNavigate} from 'react-router-dom';
import signpic from "../images/login.png"
const Register = () =>{
const history = useNavigate();
  const [user,setUser]= useState({
    name:"", password:""
  });
let name, value;
  const handleInputs = (e) => {
     console.log(e);
     name = e.target.name;
     value = e.target.value;

     setUser({...user,[name]:value})
  }
  const PostData = async (e) => {
    e.preventDefault();
    const{name, password} = user;
    const res =  await fetch('/register',{
      method :  "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, password
      })
    });
    const data = await res.json()
    if(!data)
    {
           console.log("unsuccessful");
    }
    else
    {
      history.push("/login");
    }
    }

    return(
      <>
        <div>
         <section className='signup'>
           <div className='container mt-5'>
             <div className='signup-content'>
              <div className='signup-form'>
                <h2 className='form-title'>Sign up</h2>
                <form method='POST' className='register-form' id='register-form'>
                  <div className='form-group'>
                    <label htmlFor='name'>
                      <i class = 'zmdi zmdi-account material-icons-name'></i>
                    </label>
                    <input type='text' name='name' id = 'name' autocomplete='off' 
                    value = {user.name}
                    onChange={handleInputs}
                    placeholder='Username'></input>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'>
                      <i class = 'zmdi zmdi-lock material-icons-name'></i>
                    </label>
                    <input type='password' name='password' id = 'password' autocomplete='off' 
                     value = {user.password}
                     onChange={handleInputs}
                    placeholder='password'></input>
                  </div>

                    <div className='form-group form-button'>
                    <input type='submit' name = 'signup' id='signup' className='form-submit' value='register' onClick={PostData}/>
                  </div>

                </form>
                </div>
                <div className='signup-image'>
                  <figure>
                    <img src={signpic} alt="reg pic"/>
                  </figure>
                  <NavLink to="/login" className='signup-image-link'>I am already a registered user</NavLink>
                </div>
              
            </div>
           </div>
         </section>
        </div>
        </>
    )
}

export default Register;