import { useState, useEffect } from 'react'

const useCurrentSize = () => {
  // Save current screen width and height
  let [size, setSize] = useState({ width: 0, height: 0 })

  // In this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const getWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    const getHeight = () =>
      (window && window.innerHeight) ||
      document.documentElement.clientHeight ||
      document.body.clientHeight

    if (!size.width || !size.height) {
      setSize({ width: getWidth(), height: getHeight() })
    }

    // Debounce mechanism
    let timeoutId = null

    const resizeListener = () => {
      // Prevent execution of previous setTimeout
      clearTimeout(timeoutId)
      // Change width and height from the state object after 150 milliseconds
      timeoutId = setTimeout(
        () => setSize({ width: getWidth(), height: getHeight() }),
        150
      )
    }

    // Set resize listener
    window.addEventListener('resize', resizeListener)

    // Clean up function
    return () => {
      // Remove resize listener
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return size
}

export default useCurrentSize
