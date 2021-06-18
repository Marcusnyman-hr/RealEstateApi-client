import React, {useReducer, useContext,useEffect, useState} from 'react';
import {withRouter, Link, useHistory} from 'react-router-dom';
import FormInput from '../../components/form-input/form-input.component'
import { AuthTokenContext } from '../../context/AuthTokenContext';
import axios from 'axios';
import './Login.styles.scss';
import FormContainer from '../../components/form-container/Form-container.components';
import CustomButton from '../../components/custom-button/Custom-button.component';

function Login(props) {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    username: '',
    password: '',
    }
  )
  const [authToken, setAuthToken] = useContext(AuthTokenContext)
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }


  function handleChange(event) {
    const {name, value} = event.target;
    setUser({[name]:value})
    console.log(props.location.state)
  }
  //Handle form submits
function handleSubmit(event) {
  event.preventDefault()
  const url = "http://localhost:5000/token";
  const params = new URLSearchParams()
  params.append('username', user.username)
  params.append('password', user.password)

  axios.post(url, params, {headers: headers})
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        setAuthToken({token: res.data.access_token, username: res.data.userName})
        if(props.location.state) {
          props.history.push(props.location.state.prevPath)
        }
        props.history.push('/realestates')
      }
    })
    .catch((error) => {
      if(error.response.status == 401) {
        setErrorMsg("Please check your login information!")
      }

    });
  }
  useEffect(() => {
    props.location.state &&
    setUser(props.location.state)
  },[]);

  return (
    <div className="login">
    <div className="login-bg-container"></div>
    <div className="form-wrapper">
      <FormContainer heading="Login">
      <form className="login-form" onSubmit={handleSubmit}>
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
          label="Password" 
          type="password" 
          icon="password"
          name='password'
          value={user.password}
          autoComplete="current-password"
          required
          onChange={handleChange}
          />
          <p className="errormsg">{errorMsg}</p>
          <CustomButton>Login</CustomButton>
      </form>
      <Link to="/register" className="register-link">Don't have an account? Register here!</Link>
      </FormContainer>
    </div>
    </div>
  )
}
  export default withRouter(Login)