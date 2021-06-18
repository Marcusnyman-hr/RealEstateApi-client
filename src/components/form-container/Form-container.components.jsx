import React from 'react'
import './Form-container.styles.scss'

export default function FormContainer(props) {
  return (
    <div className="form-container">
      <div className="form-container-header">
        <h2 className="form-container-heading">{props.heading}</h2>
      </div>
      <div className="form-container-content">
      {props.children}
      </div>
    </div>
  )
}
