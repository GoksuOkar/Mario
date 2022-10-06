import request from '../../requests.js';
import { useState, useEffect } from 'react';

const Comments = ({ name, eventID }) => {
  //get comments
  // display comments
  // add comment form
    //on submit, adds the comment to the list of comments in db.

    const [newComment, setNewComment] = useState({
      event_id: '',
      username: '',
      body: '',
      date: new Date()
    })
    const [comBody, setComBody] = useState("");
    const [comments, setComments] = useState([]);


  useEffect(() => {
    if ( eventID ) {
      request.getComments(eventID)
        .then(({ data }) => {
          console.log('eventID:', eventID);
          console.log('comments data:', data);
          data.map((comm) => {
            if (comm) {
              setComments(comments => comments.concat(comm));
            }
          })
        })
        .catch((err) => {
          console.log("this is a getComments error!", err);
        });
    }
  }, [newComment, eventID])

  const renderComments = (data) => {
    data.map((com) => {
      return <div className="comment">
        <p>{com.username}: {com.body}</p>
        <p>{com.date}</p>
      </div>
    })
  }

  const handleComSubmit = () => {
      request.addComment(eventID, newComment)
        .then((data) => {
          console.log('addComment success!')
        })
        .catch((err) => {
          console.log('this is a handleComSubmit error!', err);
        })
  }

  const handleChange = (e) => {
    e.preventDefault();
    setComBody(prev => prev = e.target.value)
  }

  console.log('comments', comments);


    return(
      <div>
        <div className="com-form">
          <form>
            <label>
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                value={comBody}
                onChange={handleChange}/>
            </label>
            <input type="submit" value="Submit" onSubmit={handleComSubmit}/>
          </form>
        </div>
        <div className="com-container">
        {comments ? renderComments(comments) : null}
        </div>
      </div>
    )

}

export default Comments;