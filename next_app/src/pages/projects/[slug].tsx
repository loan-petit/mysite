import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { PostOrPage, Settings } from '@tryghost/content-api'
import { readingTime } from '@tryghost/helpers'
import moment from 'moment'

import Layout from '../../components/shared/Layout'
import GhostHelper from '../api/ghost'

type Props = {
  site: Settings & { codeinjection_styles: string }
  post: PostOrPage & { codeinjection_styles: string }
}

export default function Post({ site, post }: Props) {
  if (!site || !post) return <div />

  return (
    <>
      <Head>
        <title>Loan PETIT - {post.title}</title>
      </Head>

      <Layout site={site}>
        {/* Article content */}
        <div className="container flex justify-center mx-auto">
          <article className="w-full px-6 mt-12 md:w-8/12">
            <h1 className="text-left">{post.title}</h1>
            <h5 className="mb-12">
              Published {moment(post.published_at).fromNow()} by{' '}
              <Link href="/">{post.primary_author?.name ?? 'Loan PETIT'}</Link>{' '}
              • {readingTime(post)}
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
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = (await GhostHelper.getPosts()) as PostOrPage[]
  if (!posts || !posts.length) return { paths: [], fallback: true }

  const paths = posts.map((post) => `/projects/${post.slug}`)
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    return {
      props: {
        site: await GhostHelper.getSettings(),
        post: await GhostHelper.getOnePost({ slug: params.slug as string }),
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
