import express  from 'express'
import path     from 'path'
import parser   from 'body-parser'

import knex   from './database/knex'
import Tables from './helpers/Tables'

import api            from './routes/api'
import Authentication from './passport/authentication'

import { configs } from '../helpers'

const { react }       = configs,
      { port }        = configs.server,
      app             = express(),
      tables          = Tables(knex),
      authentication  = Authentication(configs, tables.Users)

app.use(express.static(path.join(__dirname + '/../' + react.path)))

app.use(parser.json())

app.use(authentication.initialize())

app.use('/api', api(tables, configs, authentication.authenticate))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../' + react.path + react.entry))
})

app.listen(port, (e) => {
  console.log('running server on port ' + port)
})
