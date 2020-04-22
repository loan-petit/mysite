import React from 'react'
import { Link } from 'gatsby'
import * as GhostContentApi from 'tryghost__content-api'

import NavigationButton from './NavigationButton'

type NavbarProps = {
  data: GhostContentApi.Setting
}

/**
 * Navbar component
 *
 * The Navbar component is a responsive navigation bar.
 * The navigation items are taken as an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navbar: React.FunctionComponent<NavbarProps> = ({ data }) => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)

  return (
    <nav className='fixed z-10 w-full'>
      <div className='flex flex-wrap items-center justify-between px-2 py-3 bg-white'>
        <div className='container flex flex-wrap items-center justify-between px-4 mx-auto'>
          <div className='relative flex items-center justify-between w-full lg:w-auto'>
            {/* Title */}
            <Link to='/' className='mr-4 nav-text notranslate'>
              {data.title}
              <span className='text-base text-accent'>.</span>
            </Link>

            {/* Menu Button */}
            <button
              className='px-3 py-1 text-xl cursor-pointer focus:outline-none lg:hidden'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='text-gray-800 fas fa-bars' />
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className={'lg:flex' + (!navbarOpen ? ' hidden' : '')}>
            <ul className='flex flex-col mr-auto list-none lg:flex-row'>
              {data.navigation.map((navItem, i) => (
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
      </div>
    </nav>
  )
}

export default Navbar
