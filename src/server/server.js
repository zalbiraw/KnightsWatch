import express  from 'express'
import path     from 'path'
import parser   from 'body-parser'
import jwt      from 'jwt-simple'

import knex   from './database/knex'
import Tables from './helpers/Tables'

import api            from './routes/api'
import Authentication from './passport/authentication'

import { configs } from '../../helpers/helpers'

const { client, server }  = configs,
      port                = process.env.PORT || server.port,
      app                 = express(),
      tables              = Tables(knex),
      authentication      = Authentication(server, tables.Users)

app.use(express.static(client.dest.path))

app.use(parser.json())

app.use(authentication.initialize())

app.use('/api', api(tables, {
  secret: server.jwt.secret,
  authenticate: authentication.authenticate
}))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../' + client.serve))
})

app.listen(port, (e) => {
  console.log('running server on port ' + port)
})
