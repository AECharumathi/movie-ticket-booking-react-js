const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./seatingDetails.json')
const middlewares = jsonServer.defaults()
 
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
 
// Add custom routes before JSON Server router
server.get('/seatingDetails', (req, res) => {
  res.jsonp(req.query)
  console.log(" line 12 req  "+req.body+' res '+res.data)
})
 
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'PUT') {
      const re = req.body.data
    req.body = re
    console.log("PUT "+JSON.stringify(req.body)+' put res '+res.body)
  }
  // Continue to JSON Server router
  next()
})
 
// Use default router
server.use(router)
server.listen(9000, () => {
  console.log('JSON Server is running')
})