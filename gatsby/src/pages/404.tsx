import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
  <Layout>
    <section className='flex flex-col items-center justify-center'>
      <h1>Error 404</h1>
      <p>
        Page not found, <Link to='/'>return home</Link> to start over
      </p>
    </section>
  </Layout>
)

export default NotFoundPage
