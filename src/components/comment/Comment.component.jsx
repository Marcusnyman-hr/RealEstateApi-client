import React from 'react'
import './Comment.styles.scss'

export default function Comment({comment}) {
  const {content, createdOn, userName} = comment;
  const sliceDate = (date) => {
    const slicedDate = createdOn.split('T')
    slicedDate[1] = slicedDate[1].split('.')[0]
    return slicedDate[0] + ' ' + slicedDate[1]
  } 

  return (
    <div className="comment">
    {comment.createdOn ? 
      <p className="comment-date">{sliceDate(createdOn)}</p> : ''
    }
      <p className="comment-user">{userName} says:</p>
      <p className="comment-content">{content}</p>
    </div>
  )
}
