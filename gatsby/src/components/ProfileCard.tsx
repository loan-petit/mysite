import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import * as GhostContentApi from 'tryghost__content-api'

import { SocialButtons } from './common'

type ProfileCardProps = {
  data: GhostContentApi.Author
  isOwner?: boolean
}

/**
 * Profile Card component
 */
const ProfileCard: React.FunctionComponent<ProfileCardProps> = ({ data }) => {
  if (!data) return <div />

  return (
    <section className='relative py-20 bg-gray-300'>
      <div className='container px-4 mx-auto'>
        <div className='relative flex flex-col items-center w-full px-6 mb-6 break-words bg-white rounded-lg shadow-xl -v-mt-40 lg:-v-mt-24'>
          {/* Profile picture */}
          <img
            alt={data.name}
            src={data.profile_image}
            className='h-auto -mt-20 border-none rounded-full shadow-xl'
            style={{ maxWidth: '150px' }}
          />

          <div className='mt-4 text-center'>
            {/* General informations */}
            <h1>{data.name}</h1>
            <h4>Freelance developer</h4>

            {/* Social links */}
            <SocialButtons data={data} />

            {/* Location */}
            {data.location && (
              <p className='mt-6 mb-2'>
                <i className='mr-2 text-lg text-gray-700 fas fa-map-marker-alt' />{' '}
                {data.location}
              </p>
            )}
          </div>

          {/* Profile summary */}
          <div className='py-10 mt-10 text-center border-t border-gray-300'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full px-4 lg:w-9/12'>
                <p className='mb-4 text-lg'>{data.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ProfileCardQuery = props => {
  return (
    <StaticQuery
      query={graphql`
        query GhostOwnerQuery {
          ghostAuthor(slug: { eq: "loanpetit" }) {
            ...GhostAuthorFields
          }
        }
      `}
      render={data => <ProfileCard data={data.ghostAuthor} {...props} />}
    />
  )
}

export default ProfileCardQuery
