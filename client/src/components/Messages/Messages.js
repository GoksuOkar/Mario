import { useState } from 'react';
import { socket } from './../../App';
import MessageRoom from './MessageRoom.js';
import { MessageDisplay } from './MessageDisplay';
import { user, join } from '../../Utilities/socket_listeners';

export function Messages({ userObj }) {
  const [mesRms, setMesRms] = useState([]);
  const [messagesList, setMessageList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');

  const username = 'MakeOrBlake' || userObj.username ;

  console.log(username, 'username');

  socket.auth = { username };
  socket.connect();
  socket.on(user.getConversations, (convo) => {
    console.log(convo);
    setMessageList(convo);
  });

  socket.on(user.getFriends, (friends) => {
    setFriends(friends);
  })

  socket.on(user.newMessage, (convo) => {
    console.log(convo);

  })

  function handleInput (e) {
    setSelectedFriend(e.target.value);
  }

  function handleNewMessage () {
    socket.emit(user.newMessage, formatNewMessage(username, selectedFriend))
  }

  function formatNewMessage (user, toUser) {
    return {
      username: user,
      toUser: toUser,
      text: 'hi',
      time: new Date()
    }
  }

  // start group message
  const joinRoom = async (e) => {
    e.preventDefault();
    const arr = [
    "Brian",
    "James",
    "Alex",
    "Mary",
    "Alice"
];

    const room = e.target.elements.jr.value;
        socket.emit(join.group, {conversationName: room,
  users: arr});
    const rms = [...mesRms];
    rms.push(room);
    await setMesRms(rms);
  };

  // start direct message
  const messageUser = async (e) => {
  //   e.preventDefault();
  //   const user = e.target.elements.jr.value;
  //   socket.emit(join.group, {conversationName: room,
  // users: arr});
  //   const rms = [...mesRms];
  //   rms.push(room);
  //   await setMesRms(rms);
  };


  const sty = {
    position: 'fixed',
    right: '0',
    zIndex: '2',
  };
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
      <MessageDisplay />
      <div style={sty}>
        {mesRms.map((rm, i) => (
          <MessageRoom key={i} rm={rm} socket={socket} />
        ))}
      </div>
      <form onSubmit={messageUser}>
        <input name='user' placeholder='username' />
        <button>Message User</button>
      </form>
      <form onSubmit={joinRoom}>
        <input name='jr' placeholder='join room' />
        <button>Join Room</button>
      </form>
    </div>
  );
}

