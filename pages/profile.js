import { Component } from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import auth, { withAuthSync }  from '../utils/auth'

const Profile = withAuthSync((props) => {
  const { name, login, bio } = props.data
  return (
    <Layout>
      <p>Hello, {name}</p>
      <p>GitHub username: {login}</p>
      <p>Bio: {bio}</p>
    </Layout>
  )
})

Profile.getInitialProps = async (ctx) => {
  const token = auth(ctx)

  try {
    const response = await fetch('https://moor-crush.glitch.me/profile', {
    // const response = await fetch('https://with-cookie-api.now.sh', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token }),
      },
    })

    if (response.ok) {
      return await response.json();
    } else {
      // https://github.com/developit/unfetch#caveats
      return ctx.res.writeHead(302, { Location: '/login' })
    }
  } catch (error) {
    // Implementation or Network error
    throw new Error(error)
  }
}

export default Profile;
