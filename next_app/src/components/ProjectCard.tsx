import React from 'react'
import Link from 'next/link'
import { PostOrPage } from '@tryghost/content-api'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  project: PostOrPage
  isFirst: boolean
  isLast: boolean
  goPrev: () => void
  goNext: () => void
}

export default function ProjectCard ({
  project,
  isFirst,
  isLast,
  goPrev,
  goNext,
}: Props) {
  const url = `/projects/${project.slug}/`

  return (
    <section className='container p-12 mx-auto'>
      <div
        className='relative items-center block bg-gray-100 rounded-lg shadow-xl md:flex'
        style={{ minHeight: '19rem' }}
      >
        {/* Header */}
        <header
          className='relative w-full h-full overflow-hidden rounded-t-lg md:w-2/5 md:rounded-t-none md:rounded-l-lg'
          style={{ minHeight: '19rem' }}
        >
          <Link href={url}>
            <img
              className='absolute inset-0 object-cover object-center w-full h-full'
              src={project.feature_image}
              alt=''
            />
          </Link>
        </header>

        {/* Body */}
        <div className='flex items-center w-full h-full bg-gray-100 rounded-lg md:w-3/5'>
          <svg
            className='absolute inset-y-0 hidden w-24 h-full -ml-12 text-gray-100 fill-current md:block'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
          >
            <polygon points='50,0 100,0 50,100 0,100' />
          </svg>

          <div className='p-12 md:px-16'>
            <h3 className='pt-0 mb-4'>{project.title}</h3>
            <p>{project.excerpt}</p>
            <Link href={url} passHref>
              <a className='flex mt-4'>Learn more</a>
            </Link>
          </div>
        </div>

        {/* Previous and next navigation buttons */}
        {!isFirst && (
          <button
            className='left-0 -ml-6 projects-navigation-button'
            onClick={goPrev}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        )}
        {!isLast && (
          <button
            className='right-0 -mr-6 projects-navigation-button'
            onClick={goNext}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        )}
      </div>
    </section>
  )
}
