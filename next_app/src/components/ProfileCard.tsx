import React from 'react'
import { Author } from '@tryghost/content-api'

import SocialButtons from './shared/SocialButtons'
import { getOneAuthor } from '../pages/api/ghost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

type Props = {
  author: Author
}

export default function ProfileCard({ author }: Props) {
  return (
    <section className="relative pt-20 bg-gray-300">
      <div className="container px-4 mx-auto">
        <div className="relative flex flex-col items-center w-full px-6 break-words bg-white rounded-lg shadow-xl -v-mt-40 lg:-v-mt-24">
          {/* Profile picture */}
          <img
            alt={author.name}
            src={author.profile_image}
            className="h-auto -mt-20 border-none rounded-full shadow-xl"
            style={{ maxWidth: '150px' }}
          />

          <div className="mt-4 text-center">
            {/* General informations */}
            <h1 className="notranslate">{author.name}</h1>
            <h4>Freelance developer</h4>

            {/* Social links */}
            <SocialButtons
              socialUrls={{
                github: 'https://github.com/loan-petit',
                instagram: 'https://www.instagram.com/loan_ptt/',
                linkedin: 'https://www.linkedin.com/in/loanpetit/',
                website: 'https://www.malt.fr/profile/loanpetit',
              }}
            />

            {/* Location */}
            {author.location && (
              <p className="mt-6 mb-2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-lg text-gray-700"
                />{' '}
                {author.location}
              </p>
            )}
          </div>

          {/* Profile summary */}
          <div className="py-10 mt-10 text-center border-t border-gray-300">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 lg:w-9/12">
                <p className="mb-4 text-lg">{author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

