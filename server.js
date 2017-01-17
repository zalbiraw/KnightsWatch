import express  from 'express'
import path     from 'path'
import parser   from 'body-parser'

import api from './routes/api'

import { configs } from './helpers/helpers'

const port  = process.env.PORT || configs.app.port,
      app   = express()

app.use(parser.json())

app.use(express.static(configs.app.dest.path))

app.use('/api', api)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + configs.app.serve))
})

app.listen(port, (e) => {
  console.log('running server on port ' + port)
})
