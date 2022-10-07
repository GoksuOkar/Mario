import { useState } from 'react';
import './MakeGame.css';
import StartGameImg from '../../assets/images/StartGameImg.png';
import { TextInput, Textarea, Button } from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import 'dayjs/locale/en';
import moment from 'moment';
import please from '../../requests.js'

// add animation for forms to slide out on closing
const MakeGame = ({ setFormOpen, userId }) => {
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date('Thu Oct 06 2022 18:00:00 GMT-0700 (Pacific Daylight Time)'));
  const [endTime, setEndTime] = useState(new Date('Thu Oct 06 2022 21:00:00 GMT-0700 (Pacific Daylight Time)'));

  function combineDateAndTime (date, time) {
    let timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = '' + year + '-' + month + '-' + day;
    var combined = new Date(dateString + ' ' + timeString);
    return combined;
  };
  const handleSubmit = () => {
    // this extracts day from date picker and add hours and minutes from the end and start time
    let computedStartTime = combineDateAndTime(date, startTime);
    let computedEndTime = combineDateAndTime(date, endTime);

    let body = {
      eventName: document.getElementById('game-name').value,
      eventDescription: document.getElementById('game-description').value,
      peopleAttending: [userId],
      location: document.getElementById('location').value,
      startTime: computedStartTime,
      endTime: computedEndTime,
      creator: userId,
    }
    console.log('SENDING FORM TO SERVER', body);
    please.createGame(body)
     .then(() => setFormOpen(false))
     .catch(error => console.log(error))

  }
  return (
    <>
      <div id='left-form-panel'
        onClick={()=>setFormOpen(false)}
        >
        <img src={StartGameImg} alt='basketball img with text start game'></img>
      </div>
      <div id='right-form-panel'>
        <div id='form'>
          <div className='form-labels'>Game name:</div>
          <TextInput
            placeholder='name of the game'
            id='game-name'
            defaultValue='Capitol Park Courts'
            // withAsterisk
          />
          {/* can we integrate google maps here? */}
          <div className='form-labels'>Location: </div>
          <TextInput
            placeholder='address'
            id='location'
            defaultValue='800 Peter Pan Ave, San Jose, CA 95116'
          />
          <div className='form-labels'>Date: </div>
          <DatePicker
            placeholder="Pick a date"
            id='date'
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
          <div className='form-labels'>Start Time: </div>
          <TimeInput
            id='start-time'
            format='12'
            amLabel="am"
            pmLabel="pm"
            value={startTime}
            onChange={setStartTime}
          />
          <div className='form-labels'>End Time: </div>
          <TimeInput
            id='end-time'
            format='12'
            amLabel="am"
            pmLabel="pm"
            value={endTime}
            onChange={setEndTime}
          />
          <div className='form-labels'>Description: </div>
          <Textarea
            placeholder='add some description'
            id='game-description'
            defaultValue='Come play some basketball! Beginners are welcome.'
          />
          <Button
            onClick={handleSubmit}
            variant='filled'
            size='lg'
            styles={(theme) => ({
              root: {
                backgroundColor: '#6d5881',
                color: 'white',
                marginTop: '20px',
                "&:hover": {
                  backgroundColor: '#f7d25b'
                },
              },
            })}
            >
            submit
            </Button>
        </div>
      </div>
    </>
  )
}

export default MakeGame;