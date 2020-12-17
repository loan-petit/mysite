import React from 'react'
import Head from 'next/head'
import { Settings } from '@tryghost/content-api'

import Navbar from './navbar/Navbar'
import WaveShapedCanvas from './WaveShapedCanvas'

type Props = {
  children: React.ReactNode
  site: Settings & { codeinjection_styles: string }
  isHome?: boolean
}

export default function Layout ({ children, site, isHome }: Props) {
  return (
    <>
      <Head>
        <html lang={site.lang} />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=3.0, minimum-scale=1'
        />
        <link rel='icon' href={site.icon} />
        <link rel='shortcut icon' href={site.icon} />
        <style type='text/css'>{`${site.codeinjection_styles}`}</style>
        <body />
      </Head>

      <header>
        <Navbar site={site} />
        <div className='h-16'></div>
        {isHome && (
          <figure
            className='relative w-full bg-center bg-cover vh-48 lg:vh-32'
            style={{
              backgroundImage: `url(${site.cover_image})`,
            }}
          />
        )}
      </header>

      <main>
        {/* All the main content gets inserted here, index.js, post.js, etc. */}
        {children}
      </main>

      {!isHome && (
        <div className='relative mt-20 lg:mt-32'>
          <WaveShapedCanvas fillStyle='#0f172a' />
        </div>
      )}

      <div className='flex flex-col flex-wrap justify-center bg-gray-900'>
        <small className='pb-4'>
          Check out the source code on{' '}
          <a href='https://github.com/loan-petit/mysite'>GitHub</a>
          <br />
          Copyright © {new Date().getFullYear()} Loan PETIT. All rights
          reserved.
        </small>
      </div>
    </>
  )
}
