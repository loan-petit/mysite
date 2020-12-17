import Link from 'next/link'
import React from 'react'

type Props = {
  url: string
  label: string
  setNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavigationButton ({
  url,
  label,
  setNavbarOpen,
}: Props) {
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
        <Link href={url} passHref>
          <a className='nav-text'>{label}</a>
        </Link>
      </li>
    )
  }
}
