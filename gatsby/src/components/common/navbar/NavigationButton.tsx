import React from 'react'
import { Link } from 'gatsby'
import scrollToFragment from '../../../utils/scrollToFragment'

type NavigationButtonProps = {
  url: string
  label: string
}

const handleLinkClick = (e, target) => {
  if (typeof window !== 'undefined' && target.includes('#')) {
    const [targetPathname, hash] = target.split('#')
    if (window.location.pathname === targetPathname) {
      if (e) e.preventDefault()
      scrollToFragment(`#${hash}`)
    }
  }
}

/**
 * Navigation Button component
 */
const NavigationButton: React.FunctionComponent<NavigationButtonProps> = ({
  url,
  label
}) => {
  if (url.match(/^\s?http(s?)/gi)) {
    // External link
    return (
      <li className='flex items-center'>
        <a
          className='nav-text'
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {label}
        </a>
      </li>
    )
  } else {
    // Internal navigation
    return (
      <li className='flex items-center'>
        <Link
          className='nav-text'
          to={url}
          onClick={e => handleLinkClick(e, url)}
        >
          {label}
        </Link>
      </li>
    )
  }
}

export default NavigationButton