import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Author, PostOrPage, Settings } from '@tryghost/content-api'

import Layout from '../components/shared/Layout'
import ProfileCard from '../components/ProfileCard'
import Services from '../components/Services'
import WaveShapedCanvas from '../components/shared/WaveShapedCanvas'
import ProjectCard from '../components/ProjectCard'
import Contact from '../components/Contact'
import { getOneAuthor, getPosts, getSettings } from './api/ghost'

type Props = {
  site: Settings & { codeinjection_styles: string }
  author: Author
  projects: PostOrPage[]
}

export default function Home({ site, author, projects }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0)

  if (!site || !author) return <div />

  return (
    <>
      <Head>
        <title>Loan PETIT</title>
      </Head>

      <Layout site={site} isHome>
        <ProfileCard author={author} />

        <Services />

        {/* Projects */}
        <section id="projects" className="relative pt-20 pb-32 lg:pb-56">
          <h1>My Projects</h1>

          {projects[activeIndex] && (
            <ProjectCard
              project={projects[activeIndex]}
              isFirst={!activeIndex}
              isLast={activeIndex == projects.length - 1}
              goPrev={() => setActiveIndex(activeIndex - 1)}
              goNext={() => setActiveIndex(activeIndex + 1)}
            />
          )}

          {/* Buttons indicating the current item and allowing to easily browse those */}
          <div className="flex flex-wrap justify-center">
            {projects.map((_, index) => (
              <button
                key={index}
                className={
                  'w-4 h-4 mx-1 rounded-full shadow-lg hover:bg-accent-lighter focus:outline-none' +
                  (index == activeIndex ? ' bg-accent' : ' bg-gray-300')
                }
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <WaveShapedCanvas fillStyle="#0f172a" />
        </section>

        <Contact />
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    return {
      props: {
        site: await getSettings(),
        author: await getOneAuthor({ slug: 'loanpetit' }),
        projects: await getPosts(),
      },
      revalidate: 30,
    }
  } catch (error) {
    return {
      props: { site: null, author: null, projects: [] },
      revalidate: 30,
    }
  }
}
