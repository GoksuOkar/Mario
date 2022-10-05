import axios from 'axios';
import { useState, useEffect } from 'react';

const Comments = ({ name, eventID }) => {
  //get comments
  // display comments
  // add comment form
    //on submit, adds the comment to the list of comments in db.

    const [newComment, setNewComment] = useState({

      event_id: '',
      userName: '',
      body: '',
      date: new Date()
    })

  useEffect(() => {
    axios.get('/comments').then((data) => {
      console.log('data', data.data);
    })

  }, [newComment])

  const renderComments = (data) => {
    data.map((com) => {
      return <div className="comment">
        <p>{com.userName}: {com.body}</p>
        <p>{com.date}</p>
      </div>
    })
  }

  const handleComSubmit = () => {
      axios.post('/comments', {
        userName: newComment.username,
        body: newComment.body,
        date: newComment.date
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
                value={newComment.body}
                onChange={e => setNewComment(prev => prev.body = e.target.value)}/>
            </label>
            <input type="submit" value="Submit" onSubmit={handleComSubmit}/>
          </form>
        </div>
        <div className="com-container">
        {renderComments}
        </div>
      </div>
    )

}

export default Comments;