import './MakeGame.css';
import StartGameImg from '../../assets/images/StartGameImg.png';

const MakeGame = () => {
  return (
    <>
      <div id='left-form-panel'>
        <img src={StartGameImg} alt='basketball img with text start game'></img>
      </div>
      <div id='right-form-panel'> Form
      </div>
    </>
  )
}

export default MakeGame;