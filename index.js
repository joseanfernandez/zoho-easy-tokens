const Hapi = require('hapi')

const server = Hapi.server({
  host: 'localhost',
  port: 3005
})

require('./router').forEach((route) => { server.route(route) })

const init = async () => {
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
})

init()
