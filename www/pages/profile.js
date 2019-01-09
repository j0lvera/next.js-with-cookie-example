import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import withAuth, { getCookie } from 'next-authentication'

const Profile = props => {
  const { name, login, bio, avatarUrl } = props.data

  return (
    <Layout>
      <img src={avatarUrl} alt="Avatar" />
      <h1>{name}</h1>
      <p className="lead">{login}</p>
      <p>{bio}</p>

      <style jsx>{`
        img {
          max-width: 200px;
          border-radius: 0.5rem;
        }

        h1 {
          margin-bottom: 0;
        }

        .lead {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 300;
          color: #666;
        }

        p {
          color: #6a737d;
        }
      `}</style>
    </Layout>
  )
}

Profile.getInitialProps = async ctx => {
  const { token } = getCookie(ctx)

  console.log('token:', token)

  const apiUrl = 'https://with-cookie-api.now.sh/profile'
  // const apiUrl = process.browser
  //   ? `https://${window.location.host}/api/profile.js`
  //   : `https://${ctx.req.headers.host}/api/profile.js`

  const redirectOnError = () => console.log('error')
  // process.browser
  //   ? Router.push('/login')
  //   : ctx.res.writeHead(301, { Location: '/login' })

  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token })
      }
    })

    if (response.ok) {
      return await response.json()
    } else {
      // https://github.com/developit/unfetch#caveats
      return redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

const authOptions = {
  callback: () => Router.push('/login'),
  serverRedirect: '/login'
}
export default withAuth(authOptions)(Profile)
