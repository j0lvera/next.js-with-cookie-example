import React from 'react'
import Cookie from 'next-cookies'
import Layout from '../components/layout';

const Home = (props) => (
  <Layout>
    <p>Lorem Ipsum Dolor</p>
  </Layout>
);

Home.getInitialProps = async function(ctx) {
  const { token } = Cookie(ctx);

  return { token };
}

export default Home
