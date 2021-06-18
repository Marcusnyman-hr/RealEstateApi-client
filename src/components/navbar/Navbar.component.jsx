import React, {useContext} from 'react'
import { withRouter } from 'react-router'
import './Navbar.styles.scss'
import { Link } from 'react-router-dom'
import navbarlogo from '../../assets/img/logo3.svg'
import { AuthTokenContext } from '../../context/AuthTokenContext'


function NavBar({history}) {
  const [authToken, setAuthToken] = useContext(AuthTokenContext)
  function logOut() {
    setAuthToken({token: null, username: null})
    history.push('/')
  }
  return (
    <div className="navbar">
    <Link to="/" className="logo-link"><img src={navbarlogo} className="navbar-logo" alt="crash pad"/></Link>
    
    <div className="navbar-nav">
      <ul className="navbar-links">
        <li className="navbar-item"><Link to="/About" className="navbar-link">About Us</Link></li>
        <li className="navbar-item"><Link to="/Realestates" className="navbar-link">Real Estates</Link></li>
        {authToken.token ? 
        <li className="navbar-item"><Link to="/createad" className="navbar-link">Create Ad</Link></li>
        :
        ''}
        {authToken.token ? 
          <li className="navbar-item"><Link to="/account" className="navbar-link">{authToken.username}</Link></li> :
          ''
        }
        {authToken.token ? 
          <li className="navbar-item"><span className="navbar-link" onClick={logOut}>Logout</span></li> :
          <li className="navbar-item"><a href="/login" className="navbar-link">Login</a></li>
        }

        
        
      </ul>
    </div>

    </div>
  )
}

export default withRouter(NavBar);

