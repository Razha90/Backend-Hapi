const Hapi = require('@hapi/hapi')
const routes = require('../routes/api')
require('dotenv').config()

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST
  })

  server.route(routes)

  await server.start()
  console.log(`Server is running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
}

init()
