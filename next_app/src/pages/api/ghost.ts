import GhostContentAPI from '@tryghost/content-api'

function handleError (e) {
  console.error('An error occurred')
  console.error(e.response.data.errors)
}

namespace GhostHelper {
  // Create API instance with site credentials
  const api = new GhostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_CONTENT_API_KEY,
    version: 'v3',
  })

  export async function getPosts () {
    return await api.posts
      .browse({
        limit: 'all',
      })
      .catch(handleError)
  }

  export async function getOnePost ({
    id,
    slug,
  }: {
    id?: string
    slug?: string
  }) {
    return await api.posts
      .read({
        id,
        slug,
      })
      .catch(handleError)
  }

  export async function getOneAuthor ({
    id,
    slug,
  }: {
    id?: string
    slug?: string
  }) {
    return await api.authors
      .read({
        id,
        slug,
      })
      .catch(handleError)
  }

  export async function getSettings () {
    return await api.settings.browse().catch(handleError)
  }
}

export default GhostHelper
