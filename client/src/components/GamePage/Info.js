import { useEffect, useState } from 'react';
import request from '../../requests.js';
import { BigStyledButton } from '../../styledComponents/StyledButtons.js';


const Info = ({ name, createdBy, attending, location, start, end, description }) => {
  const [photos, setPhotos] = useState([]);
  const [created, setCreated] = useState("");

  useEffect(() => {
    request.getCurrentUser(createdBy)
      .then((data) => {
        setCreated(data.data.username);
      })

    if ( attending ) {
      request.getUserPhotos(attending)
        .then(({ data }) => {
          data.forEach((person) => {
            if (person !== null) {
              const attendee = {}
              attendee.id = person._id;
              attendee.photo = person.picture;
              setPhotos(photos => photos.concat(attendee));
            }
          });
        })
        .catch(err=>console.log('this is a getUserPhotos error!', err));
    }
  }, [attending]);


  const getPlayers = () => {
    // for each player in players,
      // show their photo as a clickable item
      if (photos) {
        return photos.map((player) => {
          if (player.photo) {
            return <img
              key={player._id}
              src={player.photo}
              alt={player.id}
              onClick={handlePlayerClick(player._id)}></img>
          }
        })
      }

  }

  const handlePlayerClick = (id) => {
    //when a user clicks on a player's image, it takes them to the player's profile.
    //send player.id to tell the page which profile page to load

  }


  return(
    <div className="gp_info">
      <BigStyledButton string={"Join Game"} />
      <h4>{name}</h4>
      <p><small>created by {created}</small></p>
      <p>{location}</p>
      <p>{start} - {end}</p>
      <p>{description}</p>
      <p><small>see who's playing...</small></p>
      <div>
        {getPlayers()}
      </div>
    </div>
  )

}

export default Info;