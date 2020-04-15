import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import * as moment from 'moment'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import * as GhostContentApi from 'tryghost__content-api'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

type PostProps = {
  data: {
    ghostPost: GhostContentApi.PostOrPage & { codeinjection_styles: string }
  }
  location: object
}

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post: React.FunctionComponent<PostProps> = ({ data, location }) => {
  const post = data.ghostPost
  const readingTime = readingTimeHelper(post)

  return (
    <>
      <MetaData data={data} location={location} type='article' />
      <Helmet>
        <style type='text/css'>{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout location={location}>
        {/* Article content */}
        <div className='container flex justify-center mx-auto'>
          <article className='w-full px-6 mt-12 md:w-8/12'>
            <h1 className='text-left'>{post.title}</h1>
            <h5 className='mb-12'>
              Published {moment(post.published_at).fromNow()} by{' '}
              <Link to='/' className='link'>
                {post.primary_author.name}
              </Link>{' '}
              • {readingTime}
            </h5>

            {/* Feature image */}
            {post.feature_image && (
              <figure className='container w-full mx-auto mb-12 bg-center bg-cover'>
                <img src={post.feature_image} alt={post.title} />
              </figure>
            )}

            <section
              className='content-body load-external-scripts'
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </div>
      </Layout>
    </>
  )
}

export default Post

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`
