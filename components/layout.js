import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { logout } from '../utils/auth';

const Layout = props => (
  <React.Fragment>
    <Head>
      <title>With Cookies</title>
    </Head>

    <React.Fragment>
      <header>
        <nav>
          <ul>
            <li><Link prefetch href="/"><a>Home</a></Link></li>
            <li><Link href="/login"><a>Login</a></Link></li>
            <li><Link href="/profile"><a>Profile</a></Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </nav>
      </header>

      <main>{props.children}</main>

      <footer>
        Lorem Ipsum dolor
      </footer>
    </React.Fragment>
    <style jsx>{`
      main {
        margin: 2em;
        padding: 2em;
        border: 1px solid #ccc;
      }

      ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
      }

      li:first-child {
          margin-left: auto;
      }

      li {
          margin-right: 1em;
      }

      a {
          text-decoration: none;
          color: blue;
      }

      a:hover {
          opacity: .8;
      }
    `}</style>
  </React.Fragment>
)

export default Layout;