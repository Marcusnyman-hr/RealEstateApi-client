import React, {useState, useContext, useRef} from 'react'
import axios from 'axios'
import './RateUser.styles.scss'
import { AuthTokenContext } from '../../context/AuthTokenContext'


export default function RateUser(props) {
  const [rating, setRating] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false
  })
  const test = useRef();
  const [userAlreadyRatedThisSession, setUserAlreadyRatedThisSession] = useState(false)
  const [authToken] = useContext(AuthTokenContext)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken.token}`
  }
  const hightLightRating = (starNumber) => {
    switch (starNumber) {
      case 1:
        setRating({one: true})   
        break;
      case 2:
        setRating({one: true, two: true})
        break;
      case 3:
        setRating({one: true, two: true, three: true})
        break;
      case 4:
        setRating({one: true, two: true, three: true, four: true})
        break;
      case 5:
        setRating({one: true, two: true, three: true, four: true, five: true})
        break;
      default: return
    }
  }
  function getOffsetX(el) {
    const rect = el.getBoundingClientRect();
    return rect.left + window.scrollX
  }

  function getOffsetY(el) {
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY
  }
  
  const postUserRating = (username,rating) => {
    const ratingToPost = {
      userName: username,
      value: rating
    }

    axios.post(`http://localhost:5000/api/users/ratebyusername/`, ratingToPost, { headers: headers })
    .then((res) => {
      if (res.status === 200) {
        // animateStars()

          setUserAlreadyRatedThisSession(true)
          props.updateUser(props.username)
          console.log(userAlreadyRatedThisSession)


      }
    })
    .catch((error) => {
      console.log(error.errMessage)
    });
  }
  return (
    <div>
    {!userAlreadyRatedThisSession ? 
    <div className="rateuser" ref={test}>
    <div className="rateuser-container star active-star" onMouseEnter={() => hightLightRating(1)} onMouseLeave={() => setRating({})} onClick={() => postUserRating(props.username, 1)}>
      {!rating.one ?
        <i class="far fa-star"></i>:
        <i class="fas fa-star"></i>
      }
      </div>
      <div className="rateuser-container star active-star" onMouseEnter={() => hightLightRating(2)} onMouseLeave={() => setRating({})} onClick={() => postUserRating(props.username, 2)}>
      {!rating.two ?
        <i class="far fa-star"></i>:
        <i class="fas fa-star"></i>
      }
      </div>
      <div className="rateuser-container star active-star" onMouseEnter={() => hightLightRating(3)} onMouseLeave={() => setRating({})} onClick={() => postUserRating(props.username, 3)}>
      {!rating.three ?
        <i class="far fa-star"></i>:
        <i class="fas fa-star"></i>
      }
      </div>
      <div className="rateuser-container star active-star" onMouseEnter={() => hightLightRating(4)} onMouseLeave={() => setRating({})} onClick={() => postUserRating(props.username, 4)}>
      {!rating.four ?
        <i class="far fa-star"></i>:
        <i class="fas fa-star"></i>
      }
      </div>
      <div className="rateuser-container star active-star" onMouseEnter={() => hightLightRating(5)} onMouseLeave={() => setRating({})} onClick={() => postUserRating(props.username, 5)}>
      {!rating.five ?
        <i class="far fa-star"></i>:
        <i class="fas fa-star"></i>
      }
      </div>
    </div> 
    : 
    <div className="rateuser">
    <div className="rateuser-container star">
      <p><i class="far fa-star disabled"></i></p>
    </div>
    <div className="rateuser-container star">
      <p><i class="far fa-star disabled"></i></p>
    </div>
    <div className="rateuser-container star">
      <p><i class="far fa-star disabled"></i></p>
    </div>
    <div className="rateuser-container star">
      <p><i class="far fa-star disabled"></i></p>
    </div>
    <div className="rateuser-container star">
      <p><i class="far fa-star disabled"></i></p>
    </div>
    </div>}

    </div>
  )
}
