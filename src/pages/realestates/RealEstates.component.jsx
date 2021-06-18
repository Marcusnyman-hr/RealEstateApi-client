import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import RealEstateCard from '../../components/realestateCard/RealEstateCard.component'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.component';
import './RealEstates.styles.scss'




export default function RealEstates() {
  let { username } = useParams();
  const [realEstatesFromAPI, setRealEstatesFromAPI] = useState([])
  const [loading, setLoading] = useState(true);
  // const [authToken, setAuthToken] = useContext(AuthTokenContext)

useEffect(() => {

  const fetchData = async () => {
    let url;
    if (username) {
      url = `http://localhost:5000/api/realestates/byusername/${username}`
    } else {
      url = 'http://localhost:5000/api/realestates?skip=0&take=20'
    }

    const res = await axios(
      url,
    );
    setLoading(false);
    setRealEstatesFromAPI(res.data);
    
    console.log(realEstatesFromAPI)
  };

  fetchData();
}, [username]);

  return (
    <div className="realestates">
    <div className="realestate-cards">
    {loading ? <LoadingSpinner /> : ''}
      {realEstatesFromAPI.map(realEstate => (
        <div className="realestate-card-container"><RealEstateCard key={realEstate.id} realEstate={realEstate}></RealEstateCard></div>
      ))}
    </div>
    </div>
  )
}
// Authorization: `Bearer ${authToken.token}`