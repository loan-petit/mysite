import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  socialUrls: {
    facebook?: string
    github?: string
    instagram?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export default function SocialButtons ({ socialUrls }: Props) {
  return (
    <div className='flex flex-wrap justify-center mt-6'>
      {/* Facebook */}
      {socialUrls.facebook && (
        <a href={socialUrls.facebook} target='_blank' rel='noopener noreferrer'>
          <button className='social-button'>
            <FontAwesomeIcon icon={faFacebook} />
          </button>
        </a>
      )}

      {/* GitHub */}
      {socialUrls.github && (
        <a href={socialUrls.github} target='_blank' rel='noopener noreferrer'>
          <button className='social-button'>
            <FontAwesomeIcon icon={faGithub} />
          </button>
        </a>
      )}

      {/* Instagram */}
      {socialUrls.instagram && (
        <a
          href={socialUrls.instagram}
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='social-button'>
            <FontAwesomeIcon icon={faInstagram} />
          </button>
        </a>
      )}

      {/* Linkedin */}
      {socialUrls.linkedin && (
        <a href={socialUrls.linkedin} target='_blank' rel='noopener noreferrer'>
          <button className='social-button'>
            <FontAwesomeIcon icon={faLinkedin} />
          </button>
        </a>
      )}

      {/* Twitter */}
      {socialUrls.twitter && (
        <a href={socialUrls.twitter} target='_blank' rel='noopener noreferrer'>
          <button className='social-button'>
            <FontAwesomeIcon icon={faTwitter} />
          </button>
        </a>
      )}

      {/* Website */}
      {socialUrls.website && (
        <a href={socialUrls.website} target='_blank' rel='noopener noreferrer'>
          <button className='social-button'>
            <FontAwesomeIcon icon={faGlobe} />
          </button>
        </a>
      )}
    </div>
  )
}
