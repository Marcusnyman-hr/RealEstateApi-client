
import React, {useReducer, useContext, useState} from 'react';
import './CreateAd.styles.scss'
import {withRouter, Link, useHistory} from 'react-router-dom';
import FormInput from '../../components/form-input/form-input.component'
import { AuthTokenContext } from '../../context/AuthTokenContext';
import axios from 'axios';
import FormContainer from '../../components/form-container/Form-container.components';
import CustomButton from '../../components/custom-button/Custom-button.component';


function CreateAd(props) {
  const [authToken] = useContext(AuthTokenContext)
  const [errorMsg, setErrorMsg] = useState("");
  const [realEstate, setUser] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      title: "",
      description: "",
      address: "",
      contact:"",
      constructionYear: '',
      sellingPrice: '',
      rentingPrice: '',
      type: ''
    });
  // const [authToken, setAuthToken] = useContext(AuthTokenContext)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken.token}`
  }

  // const addNewComment = (comment) => {
  //   comment.realEstateId = realEstateId;
  //   axios.post('http://localhost:5000/api/comments', comment, { headers: headers })
  //   .then((res) => {
  //     if (res.status === 201) {
  //       setCommentsFromApi([...commentsFromApi, res.data])
  //     }


  function handleChange(event) {
    const {name, value} = event.target;
    setUser({[name]:value})
  }

  
  function handleSubmit(event) {
    event.preventDefault()
    let realEstateToPost = realEstate;
    var formData = new FormData();
    var imagefile = document.querySelector('#file')
    realEstateToPost.constructionYear = parseInt(realEstateToPost.constructionYear)
    realEstateToPost.sellingPrice = parseInt(realEstateToPost.sellingPrice)
    realEstateToPost.rentingPrice = parseInt(realEstateToPost.rentingPrice)
    realEstateToPost.type = parseInt(realEstateToPost.type)

    const url = 'http://localhost:5000/api/realestates';
  
    axios.post(url, JSON.stringify(realEstateToPost), {headers: headers})
      .then((firstres) => {
        if (firstres.status === 201) {
          let id = firstres.data.id;
          console.log(id)
            formData.append("file", imagefile.files[0]);
            axios.post(`http://localhost:5000/api/realestates/addpicture/${id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${authToken.token}`
                }
            })
            .then((res) => {
              if(res.status ===200) {
                props.history.push(`/realestate/${id}`)
              }
            })
        }
      })
      .catch((error) => {
        console.log(error.response)
      });
    }
  return (
    <div className="createAd">
      <div className="register-bg-container"></div>
        <div className="createAd-form-wrapper">
          <FormContainer heading="Create new ad">
            <form id="creadeAdForm" className="create-ad-form" onSubmit={handleSubmit}>
            <div className="create-ad-form-left-right">
            <div className="create-ad-form-left">
            <FormInput 
                  label="Title"
                  icon=""
                  type='text'
                  name='title'
                  value={realEstate.title}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Description"
                  icon=""
                  type='text'
                  name='description'
                  value={realEstate.description}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Contact"
                  icon=""
                  type='text'
                  name='contact'
                  value={realEstate.contact}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Address"
                  icon=""
                  type='text'
                  name='address'
                  value={realEstate.address}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
            </div>
            <div className="create-ad-form-right">
            <FormInput 
                  label="Construction Year"
                  icon=""
                  type='number'
                  name='constructionYear'
                  value={realEstate.constructionYear}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Selling Price"
                  icon=""
                  type='number'
                  name='sellingPrice'
                  value={realEstate.sellingPrice}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <FormInput 
                  label="Rent /month"
                  icon=""
                  type='number'
                  name='rentingPrice'
                  value={realEstate.rentingPrice}
                  autoComplete="off"
                  required
                  onChange={handleChange}
                />
                <select name="type" className="realEstateTypeSelect" onChange={handleChange}>
                  <option value="1" selected>Apartment</option>
                  <option value="2">House</option>
                  <option value="3">Office</option>
                  <option value="4">Warehouse</option>
                </select>
            </div>
            </div>
            <div className="filePickerContainer">
          <label for="avatar">Choose a picture:</label>

          <input type="file" id="file" name="fileInput" accept="image/png, image/jpeg, image/jpg"></input>
          </div>
            <CustomButton>Create Ad</CustomButton>
          </form>
            </FormContainer>
          </div>
    </div>
  )
}
export default withRouter(CreateAd)