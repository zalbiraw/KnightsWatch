import Logger from './logger'

const configs = {
  client: require('../configs/client.config'),
  server: require('../configs/server.config'),
  db: require('../knexfile')
}

export { configs, Logger }
