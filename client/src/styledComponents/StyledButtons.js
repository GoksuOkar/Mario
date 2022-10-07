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
            backgroundColor: "#f7d25b"
          },
        },
      })}
  >
    {string}
  </Button>
  )
};

export function BigStyledButton({string, onClick = null}) {
  return (
    <Button
        radius='xl'
        onClick={onClick}
        variant='light'
        size='md'
        styles={(theme) => ({
          root: {
            backgroundColor: '#fc8025',
            color: 'white',
            margin: 5,
            "&:hover": {
              backgroundColor: "#cb510b"
            },
          },
        })}
    >
      {string}
    </Button>
    )
}