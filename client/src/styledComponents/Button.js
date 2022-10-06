import {Button} from '@mantine/core';

export function StyledButton({string, onClick}) {
  return (
  <Button
      onClick={onClick}
      variant='light'
      size='xs'
      styles={(theme) => ({
        root: {
          backgroundColor: '#0d5f65',
          color: 'white',
          margin: 5,
          "&:hover": {
            backgroundColor: "#fc8025"
          },
        },
      })}
  >
    {string}
  </Button>
  )
}