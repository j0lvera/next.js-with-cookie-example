import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch';
import Cookie from 'next-cookies'
import Layout from '../components/layout';

const Profile = (props) => {

    if (!props.data) {
        Router.push('/login');
    }

    const { name, login, bio } = props.data;

    return (
            <Layout>
                <p>Hello, {name}</p>
                <p>GitHub username: {login}</p>
                <p>Bio: {bio}</p>
            </Layout>
        )
    }

Profile.getInitialProps = async function(ctx) {
  const { token } = Cookie(ctx);

  if (!token) {
      return {}
  }

  try {
    const response = await fetch('https://moor-crush.glitch.me/profile', {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: JSON.stringify({ token }),
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    }
  } catch (error) {
      console.error('Implementation or Netowrk error: ', error);
  }
}

export default Profile
