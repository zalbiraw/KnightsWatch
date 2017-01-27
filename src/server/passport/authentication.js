import passport from 'passport'

import jwt from './strategies/jwt'

const authentication = (config, Users) => {
  passport.use(jwt(config, Users))

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {
      session: config.jwt.session
    })
  }

}

export default authentication
