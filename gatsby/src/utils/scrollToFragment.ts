import { scroller } from 'react-scroll'

const scrollToFragment = hash => {
  if (hash) {
    scroller.scrollTo(`${hash.slice(1)}-hash`, {
      smooth: true,
      delay: 50,
      duration: 1000
    })
  }
}

export default scrollToFragment
