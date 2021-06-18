import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import './SingleRealEstate.styles.scss'
import Comments from '../comments/Comments.component'
import NewComment from '../newcomment/NewComment.Component'
import { AuthTokenContext } from '../../context/AuthTokenContext'
import { useParams, Link } from 'react-router-dom'
import SmallUserInfo from '../smalluserinfo/SmallUserInfo.component'




export default function SingleRealEstate(props) {
  const [commentsFromApi, setCommentsFromApi] = useState([])
  const [showComments, setShowComments] = useState(false);
  const [showUserStats, setShowUserStats] = useState(false);
  const [user, setUser] = useState({});
  const [authToken] = useContext(AuthTokenContext)

  let { realEstateId } = useParams();
  const config = {
    headers: { Authorization: `Bearer ${authToken.token}` }
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken.token}`
  }
  const backgroundStyle = {
    backgroundImage: `url(${props.imgUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    zIndex: -99
  }
  const addNewComment = (comment) => {
    comment.realEstateId = realEstateId;
    axios.post('http://localhost:5000/api/comments', comment, { headers: headers })
    .then((res) => {
      if (res.status === 201) {
        setCommentsFromApi([...commentsFromApi, res.data])
      }
    })
    .catch((error) => {
      console.log(error.errMessage)
    });
  }
  const getUser = async (username) => {
    const fetchedUser = await axios(
      `http://localhost:5000/api/users/${username}`, config
    );
    return fetchedUser.data
  }
  const updateUser = async (username) => {
    console.log('updateing user')
    const user = await getUser(username)
    user.rating = user.rating.toFixed(2);
    setUser(user);
  }
  
  useEffect(() => {
    console.log(authToken.token)
    const fetchData = async () => {
      const res = await axios(
        `http://localhost:5000/api/comments/${realEstateId}?skip=0&take=100`, config
      );
      setCommentsFromApi(res.data);
      if(props.realEstate.userName) {
        console.log("running fetch user")
        const user = await getUser(props.realEstate.userName);
        user.rating = user.rating.toFixed(4);
        setUser(user);
      }
    };
  
    fetchData();
  }, [props.realEstate.userName]);

  return (
    <div className="singleRealEstate">
    <div className="singleRealEstate-background" style={backgroundStyle} />
    <Link to="/realestates" className="singreRealEstate-back-btn">
      <i class="fas fa-arrow-left"></i>
    </Link>
    <div className="singlerealestate-info-container">
      <ul className="singlerealestate-info-quicks">
        <li className="singlerealestate-info-quick">
        <i class="fas fa-home activeQuick"></i>
        </li>
        <li className="singlerealestate-info-quick"><i class="fas fa-key"></i></li>
        <li className="singlerealestate-info-quick"><i class="fas fa-dollar-sign"></i></li>
        <li className="singlerealestate-info-quick" onClick={() => setShowComments(!showComments)}>
        {props.realEstate.comments && props.realEstate.comments.length > 0  ?
        <i class="fas fa-envelope activeQuick"></i>
        :
        <i class="fas fa-envelope"></i>
        }
        </li>
      </ul>
      <div className="singlerealestate-info-background" />
      <div className="singlerealestate-info-foreground">
      <h1 className="singlerealestate-info-title">{props.realEstate.title}</h1>
      <p className="singlerealestate-info-address">{props.realEstate.address}</p>
      <p className="singlerealestate-info-description">{props.realEstate.description}</p>
      <div className="singlerealestate-additional-info">
        {props.realEstate.canBeRented ? <p className="singlerealestate-info-description">Monthly rent: ${props.realEstate.rentingPrice}</p> : ''}
        {props.realEstate.canBeSold ? <p className="singlerealestate-info-description">Asking price: ${props.realEstate.sellingPrice}</p> : ''}
        <p className="singlerealestate-info-description">Contact:</p>
        <p className="singlerealestate-info-description">{props.realEstate.contact}</p>
        <div className="singlerealestate-info-userinfo-container">
        {props.realEstate.userName ? 
          <p className="singlerealestate-info-description username" onClick={() => setShowUserStats(!showUserStats)}>Posted By: {props.realEstate.userName}</p>
          :
          ''
        }
        {showUserStats ? 
          <div className="smalluserinfo-component-container">
          <SmallUserInfo user={user} updateUser={updateUser}/>
          </div>
          :
          ''
        }

        </div>
      </div>
      </div>
    </div>
    {showComments ?
      <div className="comments-component-container">
    <div className=" close-comments-btn" onClick={() => setShowComments(false)}>
    <i className="fas fa-times-circle"></i>
    </div>
    <Comments key={Math.random().toString(36).substring(7)} comments={commentsFromApi}/>
    <div className="newcomment-component-container">
    <NewComment addNewComment={addNewComment}/>
    </div>
    </div>
    :
    ''
    }

    </div>
  )
}
