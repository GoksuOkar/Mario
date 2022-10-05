import { useState } from 'react';
import { socket } from './../../App';
import MessageRoom from './MessageRoom.js';
import { MessageDisplay } from './MessageDisplay';
import { user, join } from '../../Utilities/socket_listeners';

// define connection

export function Messages({ username }) {
  const [mesRms, setMesRms] = useState([]);
  const [messagesList, setMessageList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');

  socket.auth = { username };

  socket.on(user.getConversations, (convo) => {
    setMessageList(convo);
  });

  socket.on(user.getFriends, (friends) => {
    console.log(friends);
    setFriends(friends);
  })

  socket.on()

  function handleInput (e) {
    console.log(e.target.value);
    setSelectedFriend(e.target.value);
  }

  function handleNewMessage () {
    socket.emit(user.newMessage, )
  }

  function formatNewMessage (user, toUser, message) {
    return {
      username: user,
      toUser: toUser,
      text: message,
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

