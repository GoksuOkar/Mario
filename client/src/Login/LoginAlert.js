import { Alert } from '@mantine/core';

export default function LoginAlert({setAlert}) {
  return (
    <Alert
      title="Bummer!"
      color="teal"
      withCloseButton
      onClose={() => setAlert(false)}
    >
      You entered a wrong login info.
      Please register or try again.
    </Alert>
  )
};