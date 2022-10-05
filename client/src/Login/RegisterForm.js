import { Modal, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
const Axios = require('../requests.js');

function RegisterForm({setOpened, opened}) {

    // creates a form element using Mantine
    const form = useForm({
      initialValues: {
        username: '',
        email: '',
        password: ''
      },
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
    });

  // sends entered values to backend to create a user, return back to log in page
  const register = (values) => {
    Axios.registerUser(values)
    .then((res) => {
      console.log(res);
    })
    .then(() => setOpened(false))
  }

  return (
    <>
      <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      title='Register To Alley Oops'
      >
        <form
          id='myform'
          style={{
            width: "100%",
            textAlign: "center"
          }}
          onSubmit={form.onSubmit((values) => register(values))}
        >
          <TextInput
            placeholder="Username"
            styles={(theme) => ({
              root: {
                width: '100%'
              }
            })}
            {...form.getInputProps('username')}
          />
          <TextInput
            placeholder="your@email.com"
            styles={(theme) => ({
              root: {
                width: '100%'
              }
            })}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            placeholder="password"
            styles={(theme) => ({
              root: {
                marginTop: '20px',
                width: '100%'
              }
            })}
            {...form.getInputProps('password')}
          />
          <Button
            type='submit'
            styles={(theme) => ({
              root: {
                marginTop: '20px',
                marginBottom: '20px',
                backgroundColor: '#0d5f65',
            }})}
          >
            Register
          </Button>
        </form>
      </Modal>
    </>
  )
};

export default RegisterForm;

