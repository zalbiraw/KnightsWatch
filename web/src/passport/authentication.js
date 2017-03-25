import passport from 'passport'

import jwt from './strategies/jwt'

const authentication = (configs, Users) => {
  passport.use(jwt(configs, Users))

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {
      session: configs.jwt.session
    })
  }

}

export default authentication
