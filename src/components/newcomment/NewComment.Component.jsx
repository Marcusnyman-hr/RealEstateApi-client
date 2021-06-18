import React, {useState} from 'react'
import './NewComment.styles.scss'
import { useParams } from 'react-router-dom'

export default function NewComment({addNewComment}) {
  const realEstateId = useParams();
  const [comment, setComment] = useState({
    Content: ''
  })
  function handleChange(event) {
    const {name, value} = event.target;
    setComment({[name]:value})
  }
  const addComment = (comment) => {
    addNewComment(comment);
    setComment({Content: ''})
  }
  return (
    <div className="newcomment">
      <textarea name="content" value={comment.Content} onChange={handleChange} placeholder="Write something..."></textarea>
      <a className="send-btn"><i class="fas fa-paper-plane" onClick={()=> addComment(comment)}></i></a>
    </div>
  )
}
