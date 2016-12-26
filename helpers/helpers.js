import Logger from './logger'

const configs = {
  app: require('../configs/app.config'),
  db: require('../knexfile')
}

export { configs, Logger }
