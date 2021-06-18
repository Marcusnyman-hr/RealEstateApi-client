
import './App.css';
import React, {useContext, useState} from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import { AuthTokenContext } from './context/AuthTokenContext';
import NavBar from './components/navbar/Navbar.component';
import Landinghero from './components/landinghero/Landinghero.component';
import Login from './pages/login/Login.component';
import AboutUs from './pages/about-us/About-us.Component';
import RealEstates from './pages/realestates/RealEstates.component';
import RealEstate from './pages/realestatepage/RealEstatePage.Component';
import RealEstatePage from './pages/realestatepage/RealEstatePage.Component';
import Register from './pages/register/Register.component';
import CreateAd from './pages/create-ad/CreateAd.component';

function App() {
  const [authToken] = useContext(AuthTokenContext);
  return (
    <Router>
    <div className="App">
    <NavBar />
      <Switch>
        <Route exact path='/' component={Landinghero} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/about' component={AboutUs} />
        <Route exact path='/realestates' component={RealEstates} />
        <Route exact path='/realestates/byusername/:username' component={RealEstates} />
        <Route path='/realestate/:realEstateId' render={() => {
        return (
         authToken.token ?
         <RealEstatePage /> :
         <Redirect to={{pathname: '/login', state: { prevPath: "/realestatepage" }}}/> 
       )
       }} />
        <Route path='/createad/' render={() => {
        return (
         authToken.token ?
         <CreateAd /> :
         <Redirect to={{pathname: '/login', state: { prevPath: "/createad" }}}/> 
       )
       }} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;

