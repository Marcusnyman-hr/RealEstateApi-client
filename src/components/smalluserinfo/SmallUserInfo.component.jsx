import React, {useEffect, useState, useRef, useContext} from 'react'
import { Link } from 'react-router-dom'
import RateUser from '../rateuser/RateUser.Component'
import './SmallUserInfo.styles.scss'
import { useSpring, animated, config } from 'react-spring'
import { AuthTokenContext } from '../../context/AuthTokenContext'

export default function SmallUserInfo({user, updateUser}) {
  const [authToken] = useContext(AuthTokenContext)
  const [rating, setRating] = useState(0);
  const ratingRef = useRef(0);


  const [flip, set] = useState(false)
  const { number } = useSpring({
    reset: false,
    from: rating,
    number: ratingRef.current ? ratingRef.current : rating,
    delay: 200,
    config: config.molasses,
    onRest: () => set(!flip),
  })



  useEffect(() => {
    console.log("auth " + authToken.username)
    console.log("user " + user.userName)
    console.log("true or false " + authToken.username !== user.userName )
    setRating(parseFloat(user.rating))
    ratingRef.current = parseFloat(user.rating);

  },[user, rating])


  return (
    <div className="smalluserinfo">
      <Link to={`/realestates/byusername/${user.userName}`} className="userRealEstatesLink">Real Estates: {user.realEstates}</Link>
      <p>Comments: {user.comments}</p>
      <p>rating: <span id="ratingscore"><animated.span>{number.to(n => n.toFixed(3))}</animated.span></span></p>
        
      {authToken.username !== user.userName ? 
        <RateUser username={user.userName} updateUser={updateUser} />
        :
        ''
      }
    </div>
  )
}
