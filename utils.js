const authorizeURL = (url) => {
  const { GH_OAUTH_APP_CLIENT_ID, GH_OAUTH_APP_CLIENT_SECRET } = process.env
  return `${url}?client_id=${GH_OAUTH_APP_CLIENT_ID}&client_secret=${GH_OAUTH_APP_CLIENT_SECRET}`
}

module.exports = {
  authorizeURL
}
