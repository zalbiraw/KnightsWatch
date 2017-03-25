import Knex from 'knex'

import knexfile from '../../knexfile'

const config  = knexfile[process.env.NODE_ENV],
      knex    = Knex(config)

export default knex
