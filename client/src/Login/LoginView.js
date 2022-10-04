
import background from "../assets/images/basketballbg.png";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { TextInput, Button } from '@mantine/core';


const serverURL = 'http://localhost:3001'

function LoginView({ login, userId }) {
  const divRef = useRef(null);

  useEffect(() => {
    //get request /auth path
    axios
      .get(serverURL + '/auth')
      .then((res) => {
        if (res.data.id !== null) {
          login(res.data.id);
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
      theme: 'filled_black',
      size: 'medium',
      type: 'standard',
      text: 'continue_with'
    });
    // else set user id to returned id
  }, [])

  const handleCredentialResponse = (response) => {
    console.log('success');
    login('blblba');
  }

  // Activates when user wants to log in. Alerts if log in credentials are not right
  const handleSubmit = (e) => {

  }

  return (
    <div>
      <div
        id="LoginView"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div id="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative"
          }}
        >
          <div id="google-button" ref={divRef}></div>
          <span style={{margin: '10px'}}>OR</span>
          <form
            style={{
              width: "100%",
              textAlign: "center"
            }}
          >
            <TextInput
              placeholder="your@email.com"
              type={'email'}
              styles={(theme) => ({
                root: {
                  width: '100%'
                }
              })}
            />
            <TextInput
              placeholder="password"
              styles={(theme) => ({
                root: {
                  marginTop: '20px',
                  width: '100%'
                }
              })}
            />
            <Button
              onClick={(e) => handleSubmit(e)}
              styles={(theme) => ({
                root: {
                  marginTop: '20px',
                  marginBottom: '20px'
              }})}
            >
              Sign In
            </Button>
          </form>
          <small>
            Don't have an account?
            <small
             onClick={() => console.log('register')}
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

export default LoginView;
