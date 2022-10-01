import { Tabs } from '@mantine/core';
import img from '../assets/images/AlleyHoopsGreen.png';

const sty = {
  '&:hover': { backgroundColor: '#fc8025' },
  color: 'white',
  fontWeight: 'bolder',
  fontSize: 'larger',
};

const chgPg = (e) => {
  console.log(e.target.innerHTML);
};

export default function NavBar() {
  return (
    <Tabs
      color='orange'
      sx={{ backgroundColor: '#0d5f65' }}
      defaultValue='games'>
      <Tabs.List>
        <img src={img} alt='IMG NOT FOUND' />
        <Tabs.Tab sx={sty} style={sty} value='games' ml='auto' onClick={chgPg}>
          Games
        </Tabs.Tab>
        <Tabs.Tab sx={sty} style={sty} value='friends' onClick={chgPg}>
          Friends
        </Tabs.Tab>
        <Tabs.Tab sx={sty} style={sty} value='profile' onClick={chgPg}>
          Profile
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
