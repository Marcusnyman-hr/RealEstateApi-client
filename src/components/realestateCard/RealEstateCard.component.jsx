import React, {useState} from 'react'
import './RealEstateCard.styles.scss'
import { withRouter } from 'react-router-dom';

function RealEstateCard(props) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="realestate-card"
    onMouseEnter={() => setShowInfo(true)}
    onMouseLeave={() => setShowInfo(false)}>
    <div className="realestate-card-image">
    <img src={`http://localhost:5000/${props.realEstate.imgUrl}`}></img>
    </div>
    <div className="realestate-card-title-container">
      <h2 className="realestate-card-title">{props.realEstate.title}</h2>
    </div>
    {showInfo &&
      <div className="realestate-card-info-container" onClick={() => props.history.push(`/realestate/${props.realEstate.id}`)}>
      {props.realEstate.canBeSold &&
        <div className="realestate-card-info-text">
          <span>Selling price:  ${props.realEstate.sellingPrice}</span>
        </div>
      }
      {props.realEstate.canBeRented &&
        <div className="realestate-card-info-text">
          <span>Renting price:  ${props.realEstate.rentingPrice}</span>
        </div>
      }
    </div>
    }

    </div>
  )
}
export default withRouter(RealEstateCard)
// 'https://sweden4allab.se/wp-content/uploads/2020/01/home-real-estate-798x470.jpg'