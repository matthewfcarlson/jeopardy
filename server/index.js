const express = require('express')
const http = require('http')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const api = require("./api")
const { IOServer } = require('./io')

const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const server = http.createServer(app)
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Enable security, CORS and body parsing
  app.use(helmet());
  app.use(cors());
  app.use(compress());
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Setup api
  api.express(app);
  //api.socketio();

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })

    // Start the socket.IO Server
    const ioServer = IOServer({ host, port, server })
    ioServer.start()
  })
}
start()
