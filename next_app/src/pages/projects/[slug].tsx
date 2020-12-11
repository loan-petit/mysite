import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { PostOrPage, Settings } from '@tryghost/content-api'
import { readingTime } from '@tryghost/helpers'
import moment from 'moment'

import Layout from '../../components/shared/Layout'
import { getOnePost, getPosts, getSettings } from '../api/ghost'

type Props = {
  site: Settings & { codeinjection_styles: string }
  post: PostOrPage & { codeinjection_styles: string }
}

export default function Post({ site, post }: Props) {
  if (!site || !post) return <div />

  return (
    <Layout site={site}>
      {/* Article content */}
      <div className="container flex justify-center mx-auto">
        <article className="w-full px-6 mt-12 md:w-8/12">
          <h1 className="text-left">{post.title}</h1>
          <h5 className="mb-12">
            Published {moment(post.published_at).fromNow()} by{' '}
            <Link href="/">{post.primary_author?.name ?? 'Loan PETIT'}</Link> •{' '}
            {readingTime(post)}
          </h5>

          {/* Feature image */}
          {post.feature_image && (
            <figure className="mb-12">
              <img src={post.feature_image} alt={post.title} />
            </figure>
          )}

          <section
            className="content-body load-external-scripts"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await getPosts()) as PostOrPage[]
  if (!posts.length) return { paths: [], fallback: true }

  const paths = posts.map((post) => `/projects/${post.slug}`)
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    return {
      props: {
        site: await getSettings(),
        post: await getOnePost({ slug: params.slug as string }),
      },
      revalidate: 30,
    }
  } catch (error) {
    return {
      props: { site: null, post: null },
      revalidate: 30,
    }
  }
}
