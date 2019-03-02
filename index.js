const Hapi = require('hapi')

const server = Hapi.server({
  port: 3005
})

const init = async () => {
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
})

init()
