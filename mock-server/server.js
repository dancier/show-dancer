// see: https://github.com/typicode/json-server

// get cmd arguments
const args = process.argv.slice(2)

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(args[0])
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is listening to port 8080')
})
