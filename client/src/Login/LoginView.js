
import background from "../assets/images/basketballbg.png";
import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Button } from '@mantine/core';

const serverURL = 'http://localhost:3001'

function LoginView({ login, userId }) {
  const divRef = useRef(null);

  useEffect(() => {
    //get request /auth path
    // check from server if the user already signed in?
    // /LOGIN path > if wrong sign in, say something > 401
    // /

    // if not do below vv

    // eslint-disable-next-line no-undef
    window.google.accounts.id.initialize({
      client_id: '143714965385-rruq4eamet32hpn61alm2913qgbfed0o.apps.googleusercontent.com',
      callback: handleCredentialResponse,
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

  return (
    <div>
      <div>
        <img alt="ball" src="../assests/images/basketballbg.png"></img>
      </div>
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
            alignItems: "center"
          }}
        >
          <div id="google-button" ref={divRef}></div>
          <span style={{margin: '10px'}}>OR</span>
          <TextInput
            label="Username:"
          />
          <TextInput
            label="Email:"
            placeholder="your@email.com"
            type={'email'}
          />
          <Button
            styles={(theme) => ({
              root: {
                marginTop: '20px',
            }})}
          >
            Sign In/Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
