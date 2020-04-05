import React from 'react'
import { Link } from 'gatsby'

type NavigationButtonProps = {
  url: string
  label: string
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
          className='nav-text hover:text-gray-600'
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
        <Link className='nav-text hover:text-gray-600' to={url}>
          {label}
        </Link>
      </li>
    )
  }
}

export default NavigationButton
