import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthTokenContext } from '../../context/AuthTokenContext'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.component'
import SingleRealEstate from '../../components/singlerealestate/SingleRealEstate.component'
import './RealEstatePage.styles.scss'

export default function RealEstatePage() {
  const [realEstateFromAPI, setRealEstateFromAPI] = useState({})
  const [loading, setLoading] = useState(true);
  const [authToken] = useContext(AuthTokenContext)
  let { realEstateId } = useParams();
  const config = {
    headers: { Authorization: `Bearer ${authToken.token}` }
  }

useEffect(() => {
  console.log(authToken.token)
  const fetchData = async () => {
    const res = await axios(
      `http://localhost:5000/api/realestates/${realEstateId}`, config
    );
    setLoading(false);
    console.log(res.data)
    setRealEstateFromAPI(res.data);
    console.log(realEstateFromAPI.imgUrl)
  };

  fetchData();
}, []);

  return (
    <div className="realetatepage">
        {loading ? <LoadingSpinner /> : ''}
    <SingleRealEstate realEstate={realEstateFromAPI} imgUrl={true ? `http://localhost:5000/${realEstateFromAPI.imgUrl}` : "https://i.pinimg.com/originals/0e/a1/4d/0ea14d80dc34b581c8224eff97acf4b8.jpg"}/>
    </div>
  )
}

// https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260