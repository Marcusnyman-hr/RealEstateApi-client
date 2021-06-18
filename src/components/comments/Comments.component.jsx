import React, {useState, useEffect, useRef} from 'react'
import './Comments.styles.scss'
import Comment from '../comment/Comment.component'

export default function Comments(props) {
  const [commentState, setCommentState] = useState([])
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  useEffect(() => {
    console.log('ue is runniong')
    setCommentState(props.comments)
  }, [props.comments]);
  return (
    <div className="comments">
    {commentState.length < 1 ? 
    <Comment comment={{userName: "Admin", content: "No comments yet! Be the first to write one!"}}></Comment> : ''
    }
      {commentState.map(comment => (
        <Comment key={Math.random().toString(36).substring(7)} comment={comment} />
      ))}
      <AlwaysScrollToBottom />
    </div>
  )
}
