import axios from 'axios';
import { useState, useEffect } from 'react';

const Comments = ({ list }) => {
  //get comments
  // display comments
  // add comment form
    //on submit, adds the comment to the list of comments in db.

    const [comment, setComment] = useState({
      // *** get username from session? ask about this *** \\
      userName: '',
      body: '',
      date: new Date()
    })

  useEffect(() => {
    //reload widget when a new comment is added to the list
    comment();
  }, [list])

  const comment = () => {
    list.map((com) => {
      return <div className="comment">
        <p>{com.userName}: {com.body}</p>
        <p>{com.date}</p>
      </div>
    })
  }

  const handleComSubmit = () => {
      axios.post('/events/comments', {
        userName: comment.userName,
        body: comment.body,
        date: comment.date
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return(
    <div>
      <div className="com-form">
        <form>
          <label>
            add a comment:
            <input
              type="text"
              name="comment"
              value={comment.body}
              onChange={e => setComment(prev => prev.body = e.target.value)}/>
          </label>
          <input type="submit" value="Submit" onSubmit={handleComSubmit}/>
        </form>
      </div>
      <div className="com-container">
      {comment}
      </div>
    </div>
  )

}

export default Comments;