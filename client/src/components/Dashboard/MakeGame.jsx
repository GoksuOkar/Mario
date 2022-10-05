import { useState } from 'react';
import './MakeGame.css';
import StartGameImg from '../../assets/images/StartGameImg.png';
import { TextInput, Textarea, Button } from '@mantine/core';
import { TimeRangeInput, DatePicker } from '@mantine/dates';
import 'dayjs/locale/en';

// add animation for forms to slide out on closing
const MakeGame = ({ setFormOpen }) => {
  const [slideout, setSlideout] = useState(false);

  const handleSubmit = () => {
    // TODO
    // extract, validate, formate, send form
    let body = {
      eventName: document.getElementById('game-name'),
      location: document.getElementById('location'),
      date: document.getElementById('date'),
      time: document.getElementById('time-range')
    }
    setFormOpen(false);

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
            // withAsterisk
          />
          {/* can we integrate google maps here? */}
          <TextInput
            placeholder='address'
            label='Location:'
            id='location'
          />
          <DatePicker
            placeholder="Pick a date"
            label="Date"
            id='date'
          />
          <TimeRangeInput
            label='Start-End Time'
            id='time-range'
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