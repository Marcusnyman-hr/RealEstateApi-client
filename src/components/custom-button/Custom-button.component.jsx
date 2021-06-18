import React from 'react'
import './Custom-button.styles.scss'

export default function CustomButton(props) {
  return (
    <button className="custom-button">
      {props.children}
    </button>
  )
}
