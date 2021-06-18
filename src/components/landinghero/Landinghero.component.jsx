import React, {useContext} from 'react';
import './Landinghero.styles.scss'
import { AuthTokenContext } from '../../context/AuthTokenContext';
import { Link } from 'react-router-dom';
export default function Landinghero() {
  const [authToken] = useContext(AuthTokenContext)
  return (
    <div className="landing-hero">
      <div className="landing-hero-content">
        <div className="landing-hero-content-text">
          <h1>Need a place to crash?</h1>
          <h1>We got you covered!</h1>
        </div>
        <Link to="/realestates" className="landing-hero-cta-button">SEE WHATS AVAILABLE</Link>
      </div>
    </div>

  )
}
