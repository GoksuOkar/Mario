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
  const [date, setDate] = useState(new Date('Oct 15, 2022'))
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleSubmit = () => {
    // this extracts day from date picker and add hours and minutes from the end and start time
    let computedStartTime = moment(date).add(moment(startTime).hour(), 'h').add(moment(startTime).minute(), 'm').format();
    let computedEndTime = moment(date).add(moment(endTime).hour(), 'h').add(moment(endTime).minute(), 'm').format();
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
          <TextInput
            placeholder='name of the game'
            label='Game Name:'
            id='game-name'
            value='Capitol Park'
            // withAsterisk
          />
          {/* can we integrate google maps here? */}
          <TextInput
            placeholder='address'
            label='Location:'
            id='location'
            value='800 Peter Pan Ave, San Jose, CA 95116'
          />
          <DatePicker
            placeholder="Pick a date"
            label="Date"
            id='date'
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
          <TimeInput
            label='Start Time'
            id='start-time'
            format='12'
            amLabel="am"
            pmLabel="pm"
            value={startTime}
            onChange={setStartTime}
          />
          <TimeInput
            label='End Time'
            id='end-time'
            format='12'
            amLabel="am"
            pmLabel="pm"
            value={endTime}
            onChange={setEndTime}
          />
          <Textarea
            placeholder='add some description'
            label='Description'
            id='game-description'
          />
          <Button
          //later: change color
          variant='light'
          onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  )
}

export default MakeGame;