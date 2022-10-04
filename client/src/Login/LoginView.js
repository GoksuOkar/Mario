
import background from "../assets/images/basketballbg.png";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { TextInput, Button, PasswordInput, Modal, Group} from '@mantine/core';
import { useForm } from '@mantine/form';
import RegisterForm from "./RegisterForm.js";


const Axios = axios.create({
  baseURL: 'http://localhost:3001',
});

function LoginView({ setUserId, userId, setPage }) {
  const [opened, setOpened] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    //get request /auth path
    Axios
      .get('/auth', {withCredentials: true})
      .then((res) => {
        console.log(res);
        if (res.data.id !== null) {
          setUserId(res.data.id);
          setPage('games')
        }
      })
    // check from server if the user already signed in?
    // /LOGIN path > if wrong sign in, say something > 401
    // /

    // if not do below vv

    // eslint-disable-next-line no-undef
    window.google.accounts.id.initialize({
      client_id: '143714965385-rruq4eamet32hpn61alm2913qgbfed0o.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      auto_select: true,
    });
    // eslint-disable-next-line no-undef
    window.google.accounts.id.renderButton(document.getElementById("google-button"), {
      size: 'medium',
      type: 'standard',
      shape: 'circle',
      text: 'continue_with'
    });
    // // else set user id to returned id
  }, [])

  const handleCredentialResponse = (response) => {
    setPage('games');
  }

  // Sends login credentials to backend, alerts if wrong login
  const handleSubmit = (values) => {
    // axios.get()
    console.log(values);
  }

  // creates a form element using Mantine
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  // opens registering modal
  const openRegisterForm = () => {
    setOpened(true);
  }

  return (
    <div style={{backgroundColor:'#16141c'}}>
      <RegisterForm setOpened={setOpened} opened={opened}/>
      <div
        id="LoginView"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}
      >
        <div id="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: "2"
          }}
        >
          {/* <div id="google-button" ref={divRef}></div> */}
          <span style={{margin: '10px'}}>OR</span>
          <form
            id='myform'
            style={{
              width: "100%",
              textAlign: "center"
            }}
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
          >
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
              Sign In
            </Button>
          </form>
          <small
            style={{color: 'white'}}
          >
            Don't have an account?
            <small
             onClick={openRegisterForm}
             style={{textDecoration: 'underline', cursor: 'pointer'}}
            >
              Register here
            </small>
          </small>
        <img
          alt="ball"
          src={background}
          style={{
            opacity:'0.5',
            position: 'absolute',
            top: '-40%',
            zIndex: '-1'
          }}
        />
        </div>
      </div>
    </div>
  );
}

export { LoginView, Axios};
