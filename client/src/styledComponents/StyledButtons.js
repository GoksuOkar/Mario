import {Button} from '@mantine/core';

export function StyledButton({string, onClick = null, type = null}) {
  return (
  <Button
      type={type}
      onClick={onClick}
      variant='light'
      size='xs'
      styles={(theme) => ({
        root: {
          backgroundColor: '#0d5f65',
          color: 'white',
          margin: 5,
          "&:hover": {
            backgroundColor: 'hsl(184,67%,32%)'
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
              backgroundColor: 'hsl(25,97%,67%)'
            },
          },
        })}
    >
      {string}
    </Button>
    )
}