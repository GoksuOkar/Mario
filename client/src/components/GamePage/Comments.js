import request from '../../requests.js';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';

const Comments = ({ name, eventID }) => {
    const [comBody, setComBody] = useState("");
    const [comments, setComments] = useState([]);

  const dateStyle = {
    textAlign: "right",
  }


  useEffect(() => {
      request.getComments(eventID)
        .then(({ data }) => {
          data.map((comm) => {
            if (comm) {
              setComments(comments => comments.concat(comm));
            }
          })
        })
        .catch((err) => {
          console.log("this is a getComments error!", err);
        });
  }, [])

  const renderComments = (data) => {
    data.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0
    });

    return data.map((com) => {
      return <div className="comment">
        <p>{com.username}: {com.body}</p>
        <p style={dateStyle}><small>{moment(com.date).format('MMMM D')}, {moment(com.date).format('LT')}</small></p>
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
    setComBody(e.target.value)

  }


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