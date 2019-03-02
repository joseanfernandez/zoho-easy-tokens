const Wreck = require('wreck')
const config = require('./config')
const winston = require('winston')

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),

    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'tokens.log' })
  ]
},
{ 'timestamp': true }
)

module.exports = [
  {
    method: 'GET',
    path: '/url/for/grant/token',
    handler: async () => {
      const urlGrant = `https://accounts.zoho.eu/oauth/v2/auth` +
        `?scope=${config.scope}` +
        `&client_id=${config.clientId}` +
        `&response_type=code&access_type=offline` +
        `&redirect_uri=${config.redirectUri}` +
        `&prompt=consent`

      return {
        url: urlGrant,
        instructions: 'You will get redirected to the "redirect_uri" that you specified during registration of the app.' +
          'Note down the "code={grant_token}" parameter.' +
          'This is a short-lived token (valid only for a minute) and will be used to generate the access token and refresh token.'
      }
    }
  },
  {
    method: 'GET',
    path: '/get/tokens/{grant?}',
    handler: async (request) => {
      const grant = request.params.grant ? request.params.grant : null
      let payson

      const urlForAccesToken = `https://accounts.zoho.eu/oauth/v2/token` +
        `?code=${grant}` +
        `&client_id=${config.clientId}` +
        `&client_secret=${config.clientSecret}` +
        `&redirect_uri=${config.redirectUri}` +
        `&grant_type=authorization_code` +
        `&scope=${config.scope}`

      const { payload } = await Wreck.post(urlForAccesToken, {})

      if (payload.length > 0) {
        payson = JSON.parse(payload)
        logger.info(payload)
      } else {
        logger.info('Empty payload')
        return {}
      }

      return payson
    }
  }

]
