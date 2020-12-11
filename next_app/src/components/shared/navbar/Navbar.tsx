import React from 'react'
import Link from 'next/link'
import { Settings } from '@tryghost/content-api'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavigationButton from './NavigationButton'

type Props = {
  site: Settings
}

export default function Navbar({ site }: Props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)

  return (
    <nav className="fixed z-10 w-full px-6 py-3 bg-white">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="relative flex items-center justify-between w-full lg:w-auto">
          {/* Title */}
          <Link href="/" passHref>
            <a className="mr-4 nav-text notranslate">
              {site.title}
              <span className="text-base text-accent">.</span>
            </a>
          </Link>

          {/* Menu Button */}
          <button
            className="px-3 py-1 cursor-pointer focus:outline-none lg:hidden"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="text-xl text-gray-800" />
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className={'lg:flex' + (!navbarOpen ? ' hidden' : '')}>
          <ul className="flex flex-col mr-auto list-none lg:flex-row">
            {site.navigation.map((navItem, i) => (
              <NavigationButton
                url={navItem.url}
                label={navItem.label}
                setNavbarOpen={setNavbarOpen}
                key={i}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
