import React from 'react'

/**
 * Contact component
 */
const Contact = () => {
  return (
    <section className='relative px-6 py-24 bg-gray-900'>
      <div className='container flex flex-col w-full min-w-0 px-4 mx-auto break-words bg-gray-300 rounded-lg shadow-lg lg:w-5/12'>
        <div className='flex-auto p-5 lg:p-10'>
          <h2>Want to work with me?</h2>
          <h5>Complete this form and I will get back to you in 24 hours.</h5>

          {/* Full Name field */}
          <div className='relative w-full mt-8 mb-3'>
            <label htmlFor='full-name'>Full Name</label>
            <input
              type='text'
              placeholder='Full Name'
              style={{ transition: 'all .15s ease' }}
            />
          </div>

          {/* Email field */}
          <div className='relative w-full mb-3'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Email'
              style={{ transition: 'all .15s ease' }}
            />
          </div>

          {/* Message field */}
          <div className='relative w-full mb-3'>
            <label htmlFor='message'>Message</label>
            <textarea
              rows={4}
              cols={80}
              placeholder='Type a message...'
            />
          </div>

          {/* Submit */}
          <div className='mt-6 text-center'>
            <button
              className='px-6 py-3 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none focus:outline-none'
              type='button'
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
