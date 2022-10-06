import {Grid} from '@mantine/core';
import { useState, useEffect } from 'react';
import { socket } from './../../App';
import MessageRoom from './MessageRoom.js';
import { MessageDisplay } from './MessageDisplay';
import { user, join } from '../../Utilities/socket_listeners';

export function Messages({ userObj }) {
  const [mesRms, setMesRms] = useState([]);
  const [convoList, setConvoList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [displayChat, setDisplayChat] = useState(convoList[0]);

  const username = 'MakeOrBlake' || userObj.username ;

  useEffect(()=>{
    setDisplayChat(convoList[0])
  },[convoList])

  socket.auth = { username };
  socket.connect();
  socket.on(user.getConversations, (convo) => {
    setConvoList(convo);
  });

  socket.on(user.getFriends, (friends) => {
    setFriends(friends);
  })

  // socket.on(user.newMessage, (convo) => {
  //   console.log(convo);

  // })

  socket.on(join.room, (convo) => {
    // if convo users includes my username, then add that convo to convo list
    console.log(convo);
    if (convo.users.includes(username)) {
      socket.emit(join.room, {conversationId: convo._id.toString()});
      let temp = [...convoList];
      temp.push(convo);
      setConvoList(temp);
    }
  })

  function handleInput (e) {
    setSelectedFriend(e.target.value);
  }

  function handleNewMessage () {
    socket.emit(join.group, {
      conversationName: null,
      users: [username, selectedFriend]
    })
  }

  // start group message
//   const joinRoom = async (e) => {
//     e.preventDefault();
//     const arr = [
//     "Brian",
//     "James",
//     "Alex",
//     "Mary",
//     "Alice"
// ];

//     const room = e.target.elements.jr.value;
//         socket.emit(join.group, {conversationName: room,
//   users: arr});
//     const rms = [...mesRms];
//     rms.push(room);
//     await setMesRms(rms);
//   };

  return (
    <div>
      {friends.length > 0
      ? <div>
          <select name="selectFriend" onChange={handleInput}>
          {friends.map((friend, index) =>
            <option key={index} >{friend.username}</option>
          )}
          </select>
          <button onClick={handleNewMessage}>Message Friend</button>
        </div>
      : <div>You got no friends cuh</div>
      }
      <Grid m='auto'>
        <div>
        {convoList.map((convo) => (
          <MessageRoom key={convo._id} convo={convo} socket={socket} setDisplayChat={setDisplayChat}/>
          ))}
          </div>
          <MessageDisplay userObj={userObj} displayChat={displayChat} socket={socket}/>
        </Grid>
    </div>
  );
}
