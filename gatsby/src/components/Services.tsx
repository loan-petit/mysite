import React from 'react'

import { WaveShapedCanvas } from './common'

/**
 * Services component
 */
const Services = () => {
  return (
    <section id='services-hash' className='relative pb-32 bg-gray-300 lg:pb-56'>
      <WaveShapedCanvas fillStyle='#ffffff' />

      <h1>My services</h1>

      <div className='flex flex-wrap justify-center'>
        {/* Mobile and web applications */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-desktop' />
          </div>
          <h3>Mobile and web applications</h3>
          <p>
            I will develop both, with Flutter or React based on your
            preferences.
          </p>
        </div>

        {/* DevOps */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-cubes' />
          </div>
          <h3>DevOps</h3>
          <p>
            I will improve and automate the delivery of your software using
            GitHub Actions, Docker and Ansible.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center'>
        {/* Backend */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-cogs' />
          </div>
          <h3>Backend</h3>
          <p>
            I will develop stable and efficient backend using GraphQL, Prisma
            and Node.js.
          </p>
        </div>

        {/* Chatbot */}
        <div className='w-full px-4 mt-12 mb-4 text-center md:w-5/12 lg:w-3/12'>
          <div className='service-icon-container'>
            <i className='fas fa-comments' />
          </div>
          <h3>Chatbot</h3>
          <p>
            With Dialogflow, I will develop and deploy chatbots on voice
            assistant or messaging platforms.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services
