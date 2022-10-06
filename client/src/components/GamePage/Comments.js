import request from '../../requests.js';
import { useState, useEffect } from 'react';

const Comments = ({ name, eventID }) => {
  //get comments
  // display comments
  // add comment form
    //on submit, adds the comment to the list of comments in db.
    const [comBody, setComBody] = useState("");
    const [userName, setUserName] = useState("");
    const [comments, setComments] = useState([]);


  useEffect(() => {
  // get the username of the current user for use in the newComment state
  if (name) {
    request.getCurrentUser(name).then((data) => {
      console.log("current user:", data.data);
      setUserName(data.data.username);
    })
  }

    if ( eventID ) {
      request.getComments(eventID)
        .then(({ data }) => {
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
  }, [eventID])

  const renderComments = (data) => {
    return data.map((com) => {
      return <div className="comment">
        <p>{com.username}: {com.body}</p>
        <p>{com.date}</p>
      </div>
    })
  }

  const handleComSubmit = (e) => {
    e.preventDefault();
    console.log('eventID:', eventID);
    let newComment = {
      event_id: eventID,
      username: name,
      body: comBody,
      date: new Date()
    }
      request.addComment(newComment)
        .then((data) => {
          console.log('addComment success!')
        })
        .catch((err) => {
          console.log('this is a handleComSubmit error!', err);
        })
  }

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setComBody(e.target.value)

  }

  console.log('comments', comments);


    return(
      <div>
        <div className="com-form">
          <form onSubmit={handleComSubmit}>
            <label>
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                value={comBody}
                onChange={handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        <div className="com-container">
        {comments ? renderComments(comments) : null}
        </div>
      </div>
    )

}

export default Comments;