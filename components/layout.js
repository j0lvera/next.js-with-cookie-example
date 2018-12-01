import React from 'react';
import Head from 'next/head'
import Header from './header';

const Layout = props => (
  <React.Fragment>
    <Head>
      <title>With Cookies</title>
    </Head>

    <React.Fragment>
      <Header />

      <main>{props.children}</main>

      <footer />
    </React.Fragment>
    <style jsx>{`
      main {
        margin: 2em;
        padding: 2em;
        border: 1px solid #ccc;
      }
    `}</style>
  </React.Fragment>
)

export default Layout;