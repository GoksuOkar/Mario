

const Comments = ({ list }) => {
  //get comments
  // display comments
  // add comment form
    //on submit, adds the comment to the list of comments in db.

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
    // when submitted, this should add the comment to the list of comments in db.
      // it needs to get the current user's name.
  }


  return(
    <div>
      <div className="com-form">
        <form>
          <label>
            add a comment:
            <input type="text" name="comment" />
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