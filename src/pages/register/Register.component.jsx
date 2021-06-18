import './Register.styles.scss'
import React, {useReducer, useContext, useState} from 'react';
import {withRouter, Link} from 'react-router-dom';
import FormInput from '../../components/form-input/form-input.component'
import { AuthTokenContext } from '../../context/AuthTokenContext';
import axios from 'axios';
import FormContainer from '../../components/form-container/Form-container.components';
import CustomButton from '../../components/custom-button/Custom-button.component';


function Register({history}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    errorMsg:''
    }
  )
  // const [authToken, setAuthToken] = useContext(AuthTokenContext)
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }


  function handleChange(event) {
    const {name, value} = event.target;
    setUser({[name]:value})
  }
  //Handle form submits
function handleSubmit(event) {
  event.preventDefault()
  const url = 'http://localhost:5000/api/account/register';
  const params = new URLSearchParams()
  params.append('username', user.username)
  params.append('email', user.email)
  params.append('password', user.password)
  params.append('confirmpassword', user.confirmpassword)

  axios.post(url, params, {headers: headers})
    .then((res) => {
      if (res.status === 200) {
        history.push({
          pathname: '/login',
          state: {username: user.username, password: user.password}})
      }
    })
    .catch((error) => {
      console.log(error.response)
      if(error.response.status == 400) {
        setErrorMsg(error.response.data.title)
      }
      if(error.response.status == 500) {
        setErrorMsg(error.response.data.message)
      }
    });
  }

  return (
    <div className="register">
      <div className="register-bg-container"></div>
        <div className="form-wrapper">
          <FormContainer heading="Register">
            <form className="register-form" onSubmit={handleSubmit}>
              <FormInput 
                  label="Username"
                  icon="user"
                  type='text'
                  name='username'
                  value={user.username}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Email" 
                  type="email" 
                  icon="email"
                  name='email'
                  value={user.email}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Password" 
                  type="password" 
                  icon="password"
                  name='password'
                  value={user.password}
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Confirm Password" 
                  type="password" 
                  icon="password"
                  name='confirmpassword'
                  value={user.confirmpassword}
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                />
                <p className="errormsg">{errorMsg}</p>
                <CustomButton>Register</CustomButton>
              </form>
              <Link to="/login" className="register-link">Already have an account? Login here!</Link>
            </FormContainer>
          </div>
    </div>
  )
}
export default withRouter(Register)