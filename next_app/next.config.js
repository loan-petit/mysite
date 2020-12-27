require('dotenv').config({
  path: `.env`,
})

module.exports = {
  env: {
    SEND_EMAIL_API_URL: process.env.SEND_EMAIL_API_URL,
    RECEIVER_EMAIL: process.env.RECEIVER_EMAIL,
  },
}
